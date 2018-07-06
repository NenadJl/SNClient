import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map, filter, switchMap } from "rxjs/operators";

import "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userTokoen: string;

  constructor(private http: Http) {}

  login(user: any) {
    return this.http.post(this.baseUrl + "login", user, this.setOptions()).pipe(
      map(u => {
        const userResponse = u.json();
        if (userResponse) {
          localStorage.setItem("token", userResponse.tokenString);
          this.userTokoen = userResponse.tokenString;
        }
      })
    );
  }

  register(user: any) {
    return this.http.post(this.baseUrl + "register", user, this.setOptions());
  }

  private setOptions() {
    const headers = new Headers({ "Content-type": "application/json" });
    return new RequestOptions({ headers: headers });
  }
}
