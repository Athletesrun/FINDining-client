import { Injectable, NgZone } from "@angular/core";
import {
  CreateGroupParams, EditGroupParams,
  GenericUserQueryParams,
  GetRestaurantFeedParams, LoginParams, RegisterParams, ReviewRestaurantParams, SearchUserParams,
  SurveyResultsParams,
  AddGroupFavoriteParams
} from "../models/requests.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import * as SHA from 'sha256';
import { catchError } from "rxjs/operators";
import {
  GenericStatusRes, GetRestaurantsRes, GenericErrorRes, SearchForFriendRes, LoginRes, GetGroupsRes,
  GetUserByIdRes, CreateGroupRes, GetFriendsRes
} from "../models/responses.model";
import { Events, MenuController } from "ionic-angular";

@Injectable()
export class HttpService {
  static token = "";
  private root = "https://api.findining.org";
  private api = "/api/v1";
  private r = this.root + this.api + "/restaurants/";
  private a = this.root + this.api + "/auth/";
  private u = this.root + this.api + "/users/";
  private f = this.root + this.api + "/friends/";
  private g = this.root + this.api + "/groups/";
  // timeout = 10000;

  static getHeaders(token?) {
    return new HttpHeaders().set('Content-Type', 'application/json').set("Auth-Token", token || HttpService.token);
  }

  static makeQuery(data) {
    let query = "?";
    let first = true;
    for (let key of Object.keys(data)) {
      if (!first) query += "&";
      query += `${key}=${data[key]}`;
      first = false;
    }
    return query;
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

  constructor(private http: HttpClient, private storage: Storage, public events: Events, public zone: NgZone, private menu: MenuController) {}

  setToken(token) {
    console.log(token);
    HttpService.token = token;
    return this.storage.set("token", token);
  }

  signOut() {
    this.menu.enable(false);
    return this.setToken("");
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.of<GenericErrorRes>(error.error);
  };

  public CheckToken() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token !== null && token !== undefined && token !== "") {
          this.CheckTokenValidity(token).subscribe(res => {
            if (res.status === 10) {
              HttpService.token = token;
              resolve("home");
            }
            else {
              if (res.status === 23) {
                resolve("login");
              }
              else {
                reject("error!\n" + HttpService.CheckErrorCode(res.status));
              }
            }
          })
        }
        else {
          setTimeout(() => resolve("login"), 1000);
        }
      })
    })
  }

  // Authentication--begin paths with this.a

  public Login(params: LoginParams): Observable<LoginRes | GenericErrorRes> {
    return this.http.post<LoginRes>(
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

  public CheckTokenValidity(token: string): Observable<GenericStatusRes | GenericErrorRes> {
    return this.http.get<GenericStatusRes>(
      this.a + "checkTokenValidity",
      { headers: HttpService.getHeaders(token) }
    ).pipe(
      catchError(this.handleError)
    )
  }

  // Restaurants--begin paths with this.r

  public GetRestaurantFeed(params: GetRestaurantFeedParams, segment: number): Observable<GetRestaurantsRes | GenericErrorRes> {
    return this.http.get<GetRestaurantsRes>(
      this.r + "getRestaurantFeed/" + segment + HttpService.makeQuery(params),
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

  // Friends--starts paths with this.f

  public SearchForFriend(name: string): Observable<SearchForFriendRes | GenericErrorRes> {
    return this.http.get<SearchForFriendRes>(
      this.f + "searchforFriend/" + name,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public GetFriends(): Observable<GetFriendsRes | GenericErrorRes> {
    return this.http.get<GetFriendsRes>(
      this.f + "getFriends",
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public GetUserById(id: number): Observable<GetUserByIdRes | GenericErrorRes> {
    return this.http.get<GetUserByIdRes>(
      this.f + "getUserById/" + id,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public AddFriend(body: GenericUserQueryParams): Observable<GenericStatusRes | GenericErrorRes> {
    return this.http.post<GenericStatusRes>(
      this.f + "addFriend",
      body,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public RemoveFriend(body: GenericUserQueryParams): Observable<GenericStatusRes | GenericErrorRes> {
    return this.http.post<GenericStatusRes>(
      this.f + "removeFriend",
      body,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  // Groups--start paths with this.g

  public GetGroups(): Observable<GetGroupsRes | GenericErrorRes> {
    return this.http.get<GetGroupsRes>(
      this.g + "getGroups",
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public CreateGroup(body: CreateGroupParams): Observable<CreateGroupRes | GenericErrorRes> {
    return this.http.post<CreateGroupRes>(
      this.g + "createGroup",
      body,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public GetGroupRecommendations(groupId: number, segment: number, query: GetRestaurantFeedParams): Observable<GetRestaurantsRes | GenericErrorRes> {
    return this.http.get<GetRestaurantsRes>(
      this.g + `getRecommendations/${groupId}/${segment}` + HttpService.makeQuery(query),
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public AddToGroup(body: EditGroupParams): Observable<GenericStatusRes | GenericErrorRes> {
    return this.http.post<GenericStatusRes>(
      this.g + "addToGroup",
      body,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public AddGroupFavorite(body: AddGroupFavoriteParams): Observable<GenericStatusRes | GenericErrorRes> {
    return this.http.post<GenericStatusRes>(
      this.g + "addFavorite",
      body,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  public GetGroupFavorites(groupId: number): Observable<GetRestaurantsRes | GenericErrorRes> {
    return this.http.get<GetRestaurantsRes>(
      this.g + "favoriteList/" + groupId,
      {headers: HttpService.getHeaders()}
    ).pipe(
      catchError(this.handleError)
    )
  }

}
