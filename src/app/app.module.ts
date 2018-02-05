import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ContactService } from "./contact.service";
import { ConversationService } from "./conversation.service";
import { ConversationComponent } from "./conversation/conversation.component";
import { LoginComponent } from "./login/login.component";
import { RootComponent } from "./root.component";
import { SessionService } from "./session.service";
import { EndpointService } from "./endpoint.service";

@NgModule({
  declarations: [
    AppComponent,
    ConversationComponent,
    LoginComponent,
    RootComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "", component: AppComponent, pathMatch: "full"},
      {path: "conversations/:id", component: ConversationComponent},
    ]),
  ],
  providers: [ContactService, ConversationService, EndpointService, SessionService],
  bootstrap: [RootComponent]
})
export class AppModule {
}
