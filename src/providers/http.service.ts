import { Injectable, NgZone } from "@angular/core";
import {
  GetRestaurantFeedParams, LoginParams, RegisterParams, ReviewRestaurantParams,
  SurveyResultsParams
} from "../models/requests.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import * as SHA from 'sha256';
import { catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { GenericStatusRes, GetRestaurantsRes, GenericErrorRes } from "../models/responses.model";
import { Events } from "ionic-angular";

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

  static CheckErrorCode(code, message?) {
    console.log(code);
    switch (code) {
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
        return message || "Uh, oh! We don't know what happened. Are you connected to the internet?"
    }
  }

  constructor(private http: HttpClient, private storage: Storage, public events: Events, public zone: NgZone) {}

  setToken(token) {
    HttpService.token = token;
    return this.storage.set("token", token);
  }

  signOut() {
    return this.setToken("");
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.of<GenericErrorRes>(error.error);
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
    return this.http.post<any>(
      this.a + "login",
      Object.assign({}, params, { password: SHA(params.password + "findining") }),
      {}
    ).pipe(
        catchError(this.handleError)
      );
  }

  public Register(params: RegisterParams): Observable<any> {
    return this.http.post<any>(
      this.a + "register",
      Object.assign({}, params, { password: SHA(params.password + "findining") }),
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }

  public GetRestaurantFeed(params: GetRestaurantFeedParams, segment: number): Observable<GetRestaurantsRes | GenericErrorRes> {
    return this.http.get<GetRestaurantsRes>(
      this.r + "getRestaurantFeed/" + segment +
      `?distance=${params.distance}&price=${params.price}&meal=${params.meal}&latitude=${params.latitude}&longitude=${params.longitude}`,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public PostSurveyResults(params: SurveyResultsParams): Observable<GenericStatusRes | GenericErrorRes> {
    return this.http.post<GenericStatusRes>(
      this.r + "initialSurveyResults",
      params,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public ReviewRestaurant(params: ReviewRestaurantParams): Observable<GenericStatusRes | GenericErrorRes> {
    return this.http.post<GenericStatusRes>(
      this.r + "reviewRestaurant",
      params,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }
}
