import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthUser } from "../../_models/authUser";
import { environment } from "../../../environments/environment";
import { User } from "../../_models/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = environment.apiUrl + "auth/";
  userToken: string;
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>("../../assets/user.png");
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(user: any) {
    return this.http
      .post<AuthUser>(
        this.baseUrl + "login",
        user,
        this.setRequestOptionsHeaders()
      )
      .pipe(
        map(u => {
          const userR = u;
          if (userR && userR.tokenString) {
            localStorage.setItem("token", userR.tokenString);
            localStorage.setItem("user", JSON.stringify(userR.user));
            this.userToken = userR.tokenString;
            this.decodedToken = this.jwtHelperService.decodeToken(
              this.userToken
            );
            this.currentUser = userR.user;
          }
        }),
        catchError(this.handleError)
      );
  }

  isLoggedIn() {
    const token = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    return !this.jwtHelperService.isTokenExpired(token);
  }

  register(user: User) {
    return this.http
      .post(this.baseUrl + "register", user, this.setRequestOptionsHeaders())
      .pipe(catchError(this.handleError));
  }

  private setRequestOptionsHeaders() {
    return {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    };
  }

  private handleError(error: any) {
    const applicationError = error.headers.get("Application-Error");
    if (applicationError) {
      return throwError(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = "";
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + "\n";
        }
      }
    }
    return throwError(modelStateErrors || "Server error");
  }
}
