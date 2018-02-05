import { CaseStyle } from "kryo/case-style";
import { DocumentIoType, DocumentType } from "kryo/types/document";
import { Ucs2StringType } from "kryo/types/ucs2-string";

export interface Conversation {
  id: string;
  displayName: string;
  avatarUrl?: string;
}

export const $Conversation: DocumentIoType<Conversation> = new DocumentType<Conversation>(() => ({
  properties: {
    id: {type: new Ucs2StringType({maxLength: Infinity})},
    displayName: {type: new Ucs2StringType({maxLength: Infinity})},
    avatarUrl: {type: new Ucs2StringType({maxLength: Infinity}), optional: true},
  },
  changeCase: CaseStyle.SnakeCase,
}));
