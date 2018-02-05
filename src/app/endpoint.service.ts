import { Injectable } from "@angular/core";
import { Incident } from "incident";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { $SkypeEvent, SkypeEvent } from "skype-http/types/events/skype-event";
import { JSON_READER } from "../core/json-reader";
import { environment } from "../environments/environment";

@Injectable()
export class EndpointService {
  private endpoint?: Observable<SkypeEvent>;

  constructor() {
    this.endpoint = undefined;
  }

  getOrCreateEndpoint(): Observable<SkypeEvent> {
    if (this.endpoint === undefined) {
      const ws: WebSocket = new WebSocket(environment.wsRoot);
      this.endpoint = Observable.create((observer: Observer<any>) => {
        ws.onclose = (ev: CloseEvent) => observer.complete();
        ws.onerror = (ev: Event) => observer.error(new Incident("WebSocketError", {event: ev}));
        ws.onmessage = (ev: MessageEvent) => {
          const skypeEvent: SkypeEvent = $SkypeEvent.read(JSON_READER, ev.data);
          console.log(skypeEvent);
          observer.next(skypeEvent);
        };
      });
    }
    return this.endpoint;
  }
}
