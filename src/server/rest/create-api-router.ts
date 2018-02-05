import Koa from "koa";
import koaMount from "koa-mount";
import { ContactService } from "../api/contact-service";
import { ConversationService } from "../api/conversation-service";
import { SessionService } from "../api/session-service";
import { createContactRouter } from "./contact";
import { createConversationRouter } from "./conversation";
import { createSessionRouter } from "./session";

export interface Api {
  contactService: ContactService;
  conversationService: ConversationService;
  sessionService: SessionService;
}

export function createApiRouter(api: Api): Koa {
  const app: Koa = new Koa();

  app.use(koaMount("/contacts", <any> createContactRouter(api.contactService)));
  app.use(koaMount("/conversations", <any> createConversationRouter(api.conversationService)));
  app.use(koaMount("/sessions", <any> createSessionRouter(api.sessionService)));

  return app;
}
