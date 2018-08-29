import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../../_models/user";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { PaginatedResult } from "../../_models/pagination";
import { UserParams } from "../../_models/userParams";

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUsersUrl = environment.apiUrl + "users/";

  constructor(
    private http: HttpClient,
  ) {}

  getUsers(page?: number, itemsPerPage?: number, userParams?: UserParams): Observable<PaginatedResult<User[]>> {

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page.toString());
      params = params.append("pageSize", itemsPerPage.toString());
    }

    if (userParams) {
      params = params.append("minAge", userParams.minAge.toString());
      params = params.append("maxAge", userParams.maxAge.toString());
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    return this.http.get<User[]>(this.baseUsersUrl, { observe: "response", params: params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          const pagination = response.headers.get("Pagination");
          console.log("NENO TUKA: " + response.headers.get("Pagination"));
          if (pagination) {
            paginatedResult.pagination = JSON.parse(pagination);
          }
          console.log(response);
          return paginatedResult;
        }),
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUsersUrl + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUsersUrl + id, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUsersUrl + userId + "/photos/" + id + "/setMain", {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUsersUrl  + userId + "/photos/" + id)
    .pipe(
      catchError(this.handleError)
    );
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
