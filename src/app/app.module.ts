import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { NgxGalleryModule } from "ngx-gallery";
import { FileUploadModule } from "ng2-file-upload";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { PhotoEditorComponent } from "./members/photo-editor/photo-editor.component";

import { UserService } from "./_services/users/user.service";
import { AuthService } from "./_services/authorization/auth.service";
import { AlertifyService } from "./_services/alertify/alertify.service";

import { appRoutes } from "./routes";
import { AuthGuard } from "./_guards/auth.guard";
import { MembersDetailResolver } from "./_resolvers/members-detail.resolver";
import { MembersListResolver } from "./_resolvers/members-list.resolver";
import { MembersEditResolver } from "./_resolvers/members-edit.resolver";
import { PreventUnsavedChangesGuard } from "./_guards/prevent-unsaved-changes.guard";

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
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxGalleryModule,
    FileUploadModule,
    JwtModule.forRoot(jwtConfigObj),
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    MembersDetailResolver,
    MembersListResolver,
    MembersEditResolver,
    PreventUnsavedChangesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
