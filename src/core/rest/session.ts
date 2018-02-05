import { Ucs2StringType } from "kryo/types/ucs2-string";
import { DocumentIoType, DocumentType } from "kryo/types/document";
import { CaseStyle } from "kryo/case-style";

export interface CreateSessionBody {
  login: string;
  password: string;
}

export const $CreateSessionBody: DocumentIoType<CreateSessionBody> = new DocumentType<CreateSessionBody>({
  properties: {
    login: {type: new Ucs2StringType({maxLength: 50})},
    password: {type: new Ucs2StringType({maxLength: 200})},
  },
  changeCase: CaseStyle.SnakeCase,
});
