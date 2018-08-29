import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/user";
import { UserService } from "../../_services/users/user.service";
import { AlertifyService } from "../../_services/alertify/alertify.service";
import { MembersListResolver } from "../../_resolvers/members-list.resolver";
import { ActivatedRoute } from "@angular/router";
import { PaginatedResult, Pagination } from "../../_models/pagination";
import { UserParams } from "../../_models/userParams";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  loggedInUser: User = JSON.parse(localStorage.getItem("user"));
  gendersList = [
    { value: "male", display: "Male" },
    { value: "female", display: "Female" }
  ];
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });

    this.userParams.gender =
      this.loggedInUser.gender === "female" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";
  }

  resetFilters() {
    this.userParams.gender =
      this.loggedInUser.gender === "female" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.pagination.currentPage = page;
    this.loadUsers();
  }

  loadUsers() {
    console.log("1111111 oeo ooo load users");

    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          console.log("nennoeoeo oeo ooo load users");
          console.log(res.result);
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertifyService.error(error);
        }
      );
  }
}
