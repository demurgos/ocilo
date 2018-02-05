import { Conversation as SkypeConversation } from "skype-http/types/conversation";
import { Conversation } from "../../core/types/conversation";
import { getGlobalSkypeApi } from "./global-skype-api";

export class ConversationService {
  constructor() {
  }

  async getConversations(): Promise<Conversation[]> {
    const skypeContacts: SkypeConversation[] = await getGlobalSkypeApi().getConversations();
    return skypeContacts.map((skypeConversation: SkypeConversation): Conversation => {
      return {
        id: skypeConversation.id,
        displayName: skypeConversation.id,
      };
    });
  }
}
