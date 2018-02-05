import { Incident } from "incident";
import { Api } from "skype-http/api";

let globalSkypeApi: Api | undefined;

export function setGlobalSkypeApi(api: Api): void {
  globalSkypeApi = api;
}

export function getGlobalSkypeApi(): Api {
  if (globalSkypeApi === undefined) {
    throw new Incident("UndefinedGlobal", "Global Skype API is not defined");
  }
  return globalSkypeApi;
}
