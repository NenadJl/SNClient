import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../_services/authorization/auth.service";
import { AlertifyService } from "../_services/alertify/alertify.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisterMode: EventEmitter<boolean> = new EventEmitter();
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  cancel() {
    this.cancelRegisterMode.emit(false);
  }

  registerUser() {
    this.authService.register(this.model).subscribe(
      () => this.alertifyService.success("Success"),
      error => this.alertifyService.error(error)
    );
  }
}
