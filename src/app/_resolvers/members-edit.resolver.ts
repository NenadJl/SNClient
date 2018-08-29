import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/user";
import { UserService } from "../_services/users/user.service";
import { AlertifyService } from "../_services/alertify/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/authorization/auth.service";

@Injectable()
export class MembersEditResolver implements Resolve<User> {

    constructor (
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService,
        private authService: AuthService
    ) {}

    resolve (route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(err => {
                this.alertify.error("YOU HAVE AN ERROR");
                this.router.navigate(["/members"]);
                return of(null);
            })
        );
    }
}
