import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "../../node_modules/@angular/router";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthService } from "./_services/authorization/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { AlertifyService } from "./_services/alertify/alertify.service";
import { MemberListComponent } from "./member-list/member-list.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";

import { appRoutes } from "./routes";
import { AuthGuard } from "./_guards/auth.guard";

const jwtConfigObj = {
  config: {
    tokenGetter: () => localStorage.getItem("token"),
    whitelistedDomains: ["localhost:5000"]
  }
};

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      JwtModule.forRoot(jwtConfigObj),
      NgbModule.forRoot(),
      RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AlertifyService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
