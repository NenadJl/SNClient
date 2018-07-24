import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { AuthService } from "../_services/authorization/auth.service";
import { AlertifyService } from "../_services/alertify/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnChanges {
  model: any = {};
  helloUsername: string;

  constructor(
    public authService: AuthService,
    private alertyfyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.alertyfyService.success("NENENNENENENENENNE");
      },
      error => this.alertyfyService.error(error),
      () => this.router.navigate(["/members"])
    );
  }

  logOut() {
    this.authService.userToken = null;
    localStorage.removeItem("token");
    this.alertyfyService.success("Sucess loged out");
    this.router.navigate(["/home"]);
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }
}
