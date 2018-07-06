import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../_services/authorization/auth.service";
import { error } from "../../../node_modules/@angular/compiler/src/util";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisterMode: EventEmitter<boolean> = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  cancel() {
    this.cancelRegisterMode.emit(false);
  }

  registerUser() {
    this.authService.register(this.model).subscribe(() => console.log("Sucess"), err => console.log(err));
  }
}
