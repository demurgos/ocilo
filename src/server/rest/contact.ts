import Koa from "koa";
import koaRoute from "koa-route";
import { JSON_VALUE_WRITER } from "../../core/json-value-writer";
import { $Contact, Contact } from "../../core/types/contact";
import { ContactService } from "../api/contact-service";

export function createContactRouter(contactService: ContactService): Koa {
  const router: Koa = new Koa();

  router.use(koaRoute.get("/", getContacts));

  async function getContacts({request, response}: Koa.Context): Promise<void> {
    const contacts: Contact[] = await contactService.getContacts();
    response.body = contacts.map(contact => $Contact.write(JSON_VALUE_WRITER, contact));
  }

  return router;
}
