import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/User";
import { UserService } from "../_services/users/user.service";
import { AlertifyService } from "../_services/alertify/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class MembersListResolver implements Resolve<User[]> {

    constructor (
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService
    ) {}

    resolve (route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers().pipe(
            catchError(err => {
                this.alertify.error("YOU HAVE AN ERROR");
                this.router.navigate(["/members"]);
                return of(null);
            })
        );
    }
}
