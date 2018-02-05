import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import urlJoin from "url-join";
import { JSON_VALUE_READER } from "../core/json-value-reader";
import { $Contact, Contact } from "../core/types/contact";
import { environment } from "../environments/environment";

@Injectable()
export class ContactService {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getContacts(): Promise<Contact[]> {
    const url: string = urlJoin(environment.apiRoot, "/contacts");
    const raw: any[] = await this.httpClient.get(url).toPromise<any>();
    return raw.map(contact => $Contact.read(JSON_VALUE_READER, contact));
  }
}
