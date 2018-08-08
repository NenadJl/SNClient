import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../_models/User";
import { NgForm } from "@angular/forms";
import { UserService } from "../../_services/users/user.service";
import { AuthService } from "../../_services/authorization/auth.service";
import { AlertifyService } from "../../_services/alertify/alertify.service";
import { Photo } from "../../_models/Photo";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {

  user: User;
  photoUrl: string;

  @ViewChild("editForm") editForm: NgForm;

  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => (this.user = data["user"]));
    this.authService.currentPhotoUrl.subscribe(url => this.photoUrl = url);
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alertifyService.success("User is successfully updated!");
          this.editForm.reset(this.user);
        },
        error => this.alertifyService.error(error)
      );
  }
}
