import { Injectable } from "@angular/core";
import { LoginParams, RegisterParams } from "../models/requests.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { LoginPage } from "../pages/login/login";
import { Storage } from '@ionic/storage';
import { HomePage } from "../pages/home/home";
import { Observable } from "rxjs/Observable";
import * as SHA from 'sha256';
import { catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class HttpService {
  static token = "";
  private root = "https://api.findining.org";
  private api = "/api/v1";
  private r = this.root + this.api + "/restaurants/";
  private a = this.root + this.api + "/auth/";
  private u = this.root + this.api + "/auth/";
  // timeout = 10000;

  static getHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', "Auth-Token": HttpService.token });
  }

  static CheckErrorCode(code) {
    switch (code) {
      case 10:
        return false;
      case 11:
        return "Missing required parameters."
      case 20:
        return "User with provided email already exists."
      case 21:
        return "Invalid email and/or password combination."
      case 22:
        return "Missing token."
      case 23:
        return "Invalid token."
      case 50:
        return "Internal server error."
      default:
        return "What happened?"
    }
  }

  constructor(private http: HttpClient, private storage: Storage) {
    console.log("Http Service instantiated.");
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

  public CheckToken() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        console.log(token);
        if (token !== null && token !== undefined && token !== "") {
          HttpService.token = token;
          resolve("home");
        }
        else {
          setTimeout(() => resolve("login"), 1500);
        }
      })
    })
  }

  public Login(params: LoginParams): Observable<object> {
    return this.http.post<object>(
      this.a + "login",
      Object.assign({}, params, { password: SHA(params.password + "findining") }),
      {}
    ).pipe(
        catchError(this.handleError)
      );
  }

  public Register(params: RegisterParams): Observable<object> {
    params.password = SHA(params.password + "findining");
    return this.http.post(
      this.a + "register",
      Object.assign({}, params, { password: SHA(params.password + "findining") }),
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }
}
