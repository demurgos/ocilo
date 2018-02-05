import * as skypeHttp from "skype-http";
import { setGlobalSkypeApi } from "./global-skype-api";

export interface Credentials {
  login: string;
  password: string;
}

export class SessionService {
  constructor() {
  }

  async createSession(credentials: Credentials): Promise<void> {
    const api: skypeHttp.Api = await skypeHttp.connect({
      credentials: {username: credentials.login, password: credentials.password},
      verbose: true,
    });
    setGlobalSkypeApi(api);
  }
}
