import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "../session.service";

// tslint:disable:component-selector
@Component({
  selector: "ocilo-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  login: string;
  password: string;

  private readonly sessionService: SessionService;
  private readonly router: Router;

  constructor(sessionService: SessionService, router: Router) {
    this.sessionService = sessionService;
    this.router = router;

    this.login = "";
    this.password = "";
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    try {
      await this.sessionService.createSession({
        login: this.login,
        password: this.password,
      });
      await this.router.navigateByUrl("/");
    } catch (err) {
      console.error(err);
    }
  }
}
