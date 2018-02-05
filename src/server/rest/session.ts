import Koa from "koa";
import koaBodyParser from "koa-bodyparser";
import koaCompose from "koa-compose";
import koaRoute from "koa-route";
import { Api } from "skype-http/api";
import { $SkypeEvent } from "skype-http/types/events/skype-event";
import { JSON_VALUE_READER } from "../../core/json-value-reader";
import { JSON_VALUE_WRITER } from "../../core/json-value-writer";
import { $CreateSessionBody, CreateSessionBody } from "../../core/rest/session";
import { getGlobalSkypeApi } from "../api/global-skype-api";
import { SessionService } from "../api/session-service";
import { broadcast } from "./endpoint";

export function createSessionRouter(sessionService: SessionService): Koa {
  const router: Koa = new Koa();

  router.use(koaRoute.post("/", koaCompose([koaBodyParser(), createSession])));

  async function createSession({request, response}: Koa.Context): Promise<void> {
    const body: CreateSessionBody = $CreateSessionBody.read(JSON_VALUE_READER, request.body);
    await sessionService.createSession(body);
    const api: Api = getGlobalSkypeApi();

    api.on("event", (ev: any) => {
      console.log(ev);
      broadcast(JSON.stringify($SkypeEvent.write(JSON_VALUE_WRITER, ev)));
    });
    await api.listen();

    response.body = {displayName: api.context.username};
  }

  return router;
}
