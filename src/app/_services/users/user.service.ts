import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../../_models/User";
import { Observable, throwError } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl = environment.apiUrl + "users/";

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, this.setRequestOptionsHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + id, this.setRequestOptionsHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + id, user, this.setRequestOptionsHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + userId + "/photos/" + id + "/setMain", {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl  + userId + "/photos/" + id)
    .pipe(
      catchError(this.handleError)
    );
  }

  private setRequestOptionsHeaders() {
    const token = this.jwtHelperService.tokenGetter();
    if (token) {
      const headersOptions = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer" + " " + token);
      return {
        headers: headersOptions
      };
    }
  }

  private handleError(error: any) {
    const applicationError = error.headers.get("Application-Error");
    console.log(applicationError);
    if (applicationError) {
      return throwError(applicationError);
    }
    const serverError = error;
    console.log(serverError);
    let modelStateErrors = "";
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          console.log(key);
          console.log(serverError[key]);
          modelStateErrors += serverError[key] + "\n";
        }
      }
    }
    return throwError(modelStateErrors || "Server error");
  }

}
