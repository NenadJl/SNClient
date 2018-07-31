import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MembersDetailResolver } from "./_resolvers/members-detail.resolver";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MembersListResolver } from "./_resolvers/members-list.resolver";
import { MembersEditResolver } from "./_resolvers/members-edit.resolver";
import { PreventUnsavedChangesGuard } from "./_guards/prevent-unsaved-changes.guard";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent , resolve: {users: MembersListResolver}},
      { path: "members/:id", component: MemberDetailComponent, resolve: {neno: MembersDetailResolver}},
      { path: "member/edit", component: MemberEditComponent,
        resolve: {user: MembersEditResolver},
        canDeactivate: [PreventUnsavedChangesGuard]},
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListsComponent }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
