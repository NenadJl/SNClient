import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../_services/authorization/auth.service";
import { AlertifyService } from "../_services/alertify/alertify.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { User } from "../_models/User";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output()
  cancelRegisterMode: EventEmitter<boolean> = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registerForm = this.fb.group(
      {
        gender: ["male", Validators.required],
        username: ["", Validators.required],
        knownAs: ["", Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
        password: [
          "", [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmPassword: ["", Validators.required]
      }, {
        validator: this.confirmPasswordMatchValidator
      }
    );
  }

  cancel() {
    this.cancelRegisterMode.emit(false);
  }

  private confirmPasswordMatchValidator(group: FormGroup) {
    return group.get("password").value === group.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => this.alertifyService.success("Success"),
        error => this.alertifyService.error(error),
        () => {
          this.authService.login(this.user).subscribe(()=> {
            this.router.navigate(["/members"]);
          });
        }
      );
    }
  }
}
