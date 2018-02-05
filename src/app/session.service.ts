import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import urlJoin from "url-join";
import { JSON_VALUE_WRITER } from "../core/json-value-writer";
import { $CreateSessionBody, CreateSessionBody } from "../core/rest/session";
import { environment } from "../environments/environment";

@Injectable()
export class SessionService {
  readonly isAuthenticated: BehaviorSubject<boolean>;

  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.isAuthenticated = new BehaviorSubject(false);
  }

  async createSession(options: CreateSessionBody): Promise<void> {
    const url: string = urlJoin(environment.apiRoot, "/sessions");
    const body: any = $CreateSessionBody.write(JSON_VALUE_WRITER, options);
    await this.httpClient.post<void>(url, body).toPromise();
    this.isAuthenticated.next(true);
  }
}
