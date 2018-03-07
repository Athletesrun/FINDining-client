import { Injectable } from "@angular/core";
import { LoginParams, RegisterParams } from "../models/requests.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginPage } from "../pages/login/login";
import { Storage } from '@ionic/storage';
import { HomePage } from "../pages/home/home";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpService {
  static token = "";
  root = "https://api.findining.org";
  api = "/api/v1";
  r = this.root + this.api + "/restaurants/";
  a = this.root + this.api + "/auth/";
  u = this.root + this.api + "/auth/";
  timeout = 10000;

  static getHeaders() {

    return new HttpHeaders({ 'Content-Type': 'application/json', "Auth-Token": HttpService.token });

  }

  constructor(private http: HttpClient, private storage: Storage) {
    console.log("Http Service instantiated.");
  }

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
    return this.http.post(
      this.a + "login",
      params,
      {
        headers: HttpService.getHeaders()
      }
      ).timeout(this.timeout).map((res: any) => {
      return res.json();
    });
  }

  public Register(params: RegisterParams): Observable<object> {
    return this.http.post(
      this.a + "register",
      params,
      {
        headers: HttpService.getHeaders()
      }
      ).timeout(this.timeout).map((res: any) => {
      return res.json;
    })
  }
}
