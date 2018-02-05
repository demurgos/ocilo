import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/filter";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import urlJoin from "url-join";
import { JSON_VALUE_READER } from "../core/json-value-reader";
import { $Conversation, Conversation } from "../core/types/conversation";
import { Message } from "../core/types/message";
import { environment } from "../environments/environment";
import { EndpointService } from "./endpoint.service";
import { SkypeEvent } from "skype-http/types/events/skype-event";
import { EventResourceType } from "skype-http/types/events/event-resource-type";
import { NewMessageEvent } from "skype-http/types/events/new-message-event";
import { MessageType } from "skype-http/types/resources/message-type";

@Injectable()
export class ConversationService {
  private readonly endpointService: EndpointService;
  private readonly httpClient: HttpClient;

  constructor(endpointService: EndpointService, httpClient: HttpClient) {
    this.endpointService = endpointService;
    this.httpClient = httpClient;
  }

  async getConversations(): Promise<Conversation[]> {
    const url: string = urlJoin(environment.apiRoot, "/conversations");
    const raw: any[] = await this.httpClient.get(url).toPromise<any>();
    return raw.map(conversation => $Conversation.read(JSON_VALUE_READER, conversation));
  }

  async getConversationById(conversationId: string): Promise<Conversation> {
    return {id: conversationId, displayName: conversationId};
  }

  observeMessages(conversationId: string): BehaviorSubject<Message[]> {
    const result: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
    let messages: Message[] = [];
    this.endpointService.getOrCreateEndpoint()
      .filter((skypeEvent: SkypeEvent): boolean => {
        if (skypeEvent.resourceType !== EventResourceType.NewMessage) {
          return false;
        }
        return true;
      })
      .subscribe((newMessageEvent: NewMessageEvent): void => {
        if (newMessageEvent.resource.messageType === MessageType.RichText) {
          messages = [...messages, {textContent: newMessageEvent.resource.content}];
          result.next(messages);
        }
      });

    return result;
  }
}
