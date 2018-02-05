import { Contact as SkypeContact } from "skype-http/types/contact";
import { Contact } from "../../core/types/contact";
import { getGlobalSkypeApi } from "./global-skype-api";

export class ContactService {
  constructor() {
  }

  async getContacts(): Promise<Contact[]> {
    const skypeContacts: SkypeContact[] = await getGlobalSkypeApi().getContacts();
    return skypeContacts.map((skypeContact: SkypeContact): Contact => {
      return {
        id: skypeContact.mri,
        displayName: skypeContact.displayName,
      };
    });
  }
}
