import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/User";
import { UserService } from "../../_services/users/user.service";
import { AlertifyService } from "../../_services/alertify/alertify.service";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers()
      .subscribe(
        (users: User[]) => (this.users = users),
        error => this.alertifyService.error(error)
      );
  }
}
