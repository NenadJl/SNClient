import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/User";
import { UserService } from "../../_services/users/user.service";
import { AlertifyService } from "../../_services/alertify/alertify.service";
import { MembersListResolver } from "../../_resolvers/members-list.resolver";
import { Route, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => this.users = data["users"]);
  }
}
