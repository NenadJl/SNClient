import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/user";
import { UserService } from "../_services/users/user.service";
import { AlertifyService } from "../_services/alertify/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PaginatedResult } from "../_models/pagination";

@Injectable()
export class MembersListResolver implements Resolve<PaginatedResult<User[]>> {

    pageNumber = 1;
    pageSize = 3;

    constructor (
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService
    ) {}

    resolve (route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
        console.log("asdsadsadasdasdasdsad");
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(err => {
                this.alertify.error("YOU HAVE AN ERROR");
                this.router.navigate(["/members"]);
                return of(null);
            })
        );
    }
}
