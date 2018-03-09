import { Injectable } from "@angular/core";
import {
  GetRestaurantFeedParams, LoginParams, RegisterParams, ReviewRestaurantParams,
  SurveyResultsParams
} from "../models/requests.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";
import * as SHA from 'sha256';
import { catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import {GenericStatusRes, GetRestaurantsRes} from "../models/responses.model";

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
    return new HttpHeaders().set('Content-Type', 'application/json').set("Auth-Token", HttpService.token);
  }

  static CheckErrorCode(code) {
    switch (code) {
      case 10:
        return false;
      case 11:
        return "Missing required parameters.";
      case 20:
        return "User with provided email already exists.";
      case 21:
        return "Invalid email and/or password combination.";
      case 22:
        return "Missing token.";
      case 23:
        return "Invalid token.";
      case 50:
        return "Internal server error.";
      default:
        return "What happened?"
    }
  }

  constructor(private http: HttpClient, private storage: Storage) {}

  setToken(token) {
    HttpService.token = token;
    return this.storage.set("token", token);
  }

  signOut() {
    return this.setToken("");
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
        if (token !== null && token !== undefined && token !== "") {
          HttpService.token = token;
          setTimeout(() => resolve("home"), 1000);
        }
        else {
          setTimeout(() => resolve("login"), 1000);
        }
      })
    })
  }

  public Login(params: LoginParams): Observable<any> {
    return this.http.post<object>(
      this.a + "login",
      Object.assign({}, params, { password: SHA(params.password + "findining") }),
      {}
    ).pipe(
        catchError(this.handleError)
      );
  }

  public Register(params: RegisterParams): Observable<any> {
    return this.http.post(
      this.a + "register",
      Object.assign({}, params, { password: SHA(params.password + "findining") }),
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }

  public GetRestaurantFeed(params: GetRestaurantFeedParams, segment: number): Observable<GetRestaurantsRes> {
    return this.http.get(
      this.r + "getRestaurantFeed/" + segment +
      `?distance=${params.distance}&price=${params.price}&meal=${params.meal}&latitude=${41.2523630}&longitude=${-95.9979880}`,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public PostSurveyResults(params: SurveyResultsParams): Observable<GenericStatusRes> {
    return this.http.post<GenericStatusRes>(
      this.r + "initialSurveyResults",
      params,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public ReviewRestaurant(params: ReviewRestaurantParams): Observable<GenericStatusRes> {
    return this.http.post<GenericStatusRes>(
      this.r + "reviewRestaurant",
      params,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }
}
