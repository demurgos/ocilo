import koaCors from "@koa/cors";
import http from "http";
import Koa from "koa";
import koaLogger from "koa-logger";
import koaMount from "koa-mount";
import WebSocket from "ws";
import "./polyfills.server";
import { ContactService } from "./server/api/contact-service";
import { ConversationService } from "./server/api/conversation-service";
import { SessionService } from "./server/api/session-service";
import { Api, createApiRouter } from "./server/rest/create-api-router";
import { addConnection } from "./server/rest/endpoint";

async function main(): Promise<void> {
  const contactService = new ContactService();
  const conversationService = new ConversationService();
  const sessionService = new SessionService();

  const api: Api = {contactService, conversationService, sessionService};
  const apiRouter: Koa = createApiRouter(api);

  const app: Koa = new Koa();
  const port = 8080;

  app.use(koaLogger());
  app.use(koaCors());
  // TODO: Remove cast
  app.use(koaMount("/", <any> apiRouter));

  const server: http.Server = http.createServer(app.callback());
  const wsServer = new WebSocket.Server({server});
  wsServer.on("connection", ws => addConnection(ws));

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

main()
  .catch((err: Error): never => {
    console.error(err.stack);
    return process.exit(1) as never;
  });
