import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthUser } from "../../_models/authUser";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userToken: string;
  decodedToken: any;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  login(user: any) {
    return this.http
      .post<AuthUser>(this.baseUrl + "login", user, this.setRequestOptions())
      .pipe(
        map(u => {
          const userR = u;
          if (userR && userR.tokenString) {
            localStorage.setItem("token", userR.tokenString);
            this.userToken = userR.tokenString;
            this.decodedToken = this.jwtHelperService.decodeToken(
              this.userToken
            );
            console.log(this.decodedToken);
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

  register(user: any) {
    return this.http
      .post(this.baseUrl + "register", user, this.setRequestOptions())
      .pipe(catchError(this.handleError));
  }

  private setRequestOptions() {
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
