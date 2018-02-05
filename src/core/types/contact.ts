import { CaseStyle } from "kryo/case-style";
import { DocumentIoType, DocumentType } from "kryo/types/document";
import { Ucs2StringType } from "kryo/types/ucs2-string";

export interface Contact {
  id: string;
  displayName: string;
  avatarUrl?: string;
}

export const $Contact: DocumentIoType<Contact> = new DocumentType<Contact>(() => ({
  properties: {
    id: {type: new Ucs2StringType({maxLength: Infinity})},
    displayName: {type: new Ucs2StringType({maxLength: Infinity})},
    avatarUrl: {type: new Ucs2StringType({maxLength: Infinity}), optional: true},
  },
  changeCase: CaseStyle.SnakeCase,
}));
