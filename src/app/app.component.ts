import { Component, OnInit } from "@angular/core";
import { AuthService } from "./_services/authorization/auth.service";
import { JwtHelperService } from "../../node_modules/@auth0/angular-jwt";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(
    private authService: AuthService,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.authService.decodedToken =
      this.jwtHelperService.decodeToken(
        this.jwtHelperService.tokenGetter()
      );
  }
}
