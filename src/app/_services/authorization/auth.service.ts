import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userTokoen: string;

  constructor(private http: Http) {}

  login(user: any) {
    return this.http
      .post(this.baseUrl + "login", user, this.setResuestOptions())
      .pipe(
        map(u => {
          const userResponse = u.json();
          if (userResponse) {
            localStorage.setItem("token", userResponse.tokenString);
            this.userTokoen = userResponse.tokenString;
          }
        }),
        catchError(this.handleError)
      );
  }

  register(user: any) {
    return this.http.post(
      this.baseUrl + "register",
      user,
      this.setResuestOptions()
    ).pipe(
      catchError(this.handleError));
  }

  private setResuestOptions() {
    const headers = new Headers({ "Content-type": "application/json" });
    return new RequestOptions({ headers: headers });
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
