import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Conversation } from "../../core/types/conversation";
import { ConversationService } from "../conversation.service";
import { Message } from "../../core/types/message";

// tslint:disable:component-selector
@Component({
  selector: "ocilo-conversation",
  templateUrl: "./conversation.component.html",
  styleUrls: ["./conversation.component.css"],
})
export class ConversationComponent implements OnInit {
  @Input()
  conversation: Conversation;

  messages: Message[];

  private readonly activatedRoute: ActivatedRoute;
  private readonly conversationService: ConversationService;

  constructor(activatedRoute: ActivatedRoute, conversationService: ConversationService) {
    this.activatedRoute = activatedRoute;
    this.conversationService = conversationService;
    this.messages = [];
  }

  ngOnInit(): void {
    this.getConversation();
  }

  private async getConversation(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.conversation = await this.conversationService.getConversationById(id);
    this.conversationService.observeMessages(id)
      .subscribe(next => this.messages = next);
  }
}
