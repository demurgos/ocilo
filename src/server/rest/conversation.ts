import Koa from "koa";
import koaRoute from "koa-route";
import { JSON_VALUE_WRITER } from "../../core/json-value-writer";
import { $Conversation, Conversation } from "../../core/types/conversation";
import { ConversationService } from "../api/conversation-service";

export function createConversationRouter(conversationService: ConversationService): Koa {
  const router: Koa = new Koa();

  router.use(koaRoute.get("/", getConversations));

  async function getConversations({request, response}: Koa.Context): Promise<void> {
    const items: Conversation[] = await conversationService.getConversations();
    response.body = items.map(item => $Conversation.write(JSON_VALUE_WRITER, item));
  }

  return router;
}
