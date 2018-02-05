import { Component, OnInit } from "@angular/core";
import { SessionService } from "./session.service";
import { Contact } from "../core/types/contact";
import { ContactService } from "./contact.service";
import { Conversation } from "../core/types/conversation";
import { ConversationService } from "./conversation.service";

// tslint:disable:component-selector
@Component({
  selector: "ocilo-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  contacts: Contact[];
  conversations: Conversation[];

  private readonly contactService: ContactService;
  private readonly conversationService: ConversationService;
  private readonly sessionService: SessionService;

  constructor(contactService: ContactService, conversationService: ConversationService, sessionService: SessionService) {
    this.contactService = contactService;
    this.conversationService = conversationService;
    this.sessionService = sessionService;
    this.isAuthenticated = this.sessionService.isAuthenticated.getValue();
    this.contacts = [];
  }

  ngOnInit(): void {
    this.sessionService.isAuthenticated
      .subscribe(async (next: boolean) => {
        this.isAuthenticated = next;
        if (!next) {
          return;
        }
        this.contacts = await this.contactService.getContacts();
        this.conversations = await this.conversationService.getConversations();
      });
  }
}
