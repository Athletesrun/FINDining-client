import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { RegisterPage } from '../register/register';
import { LoginParams } from '../../models/requests.model';
import { HomePage } from "../home/home";
import {WelcomeSurvey} from "../welcomeSurvey/welcomeSurvey";

@Component({
  templateUrl: 'login.html',
  selector: 'page-login',
  providers: [HttpService]
})
export class LoginPage {
  params: LoginParams = {
    email: "",
    password: ""
  };

  error = {
    visible: false,
    message: ""
  };

  isLoading = false;

  constructor(private nav: NavController, private http: HttpService) { }

  login() {
    this.error.visible = false;
    this.isLoading = true;
    this.http.Login(this.params).subscribe((res: any) => {
      console.log(res);
      if (res.status !== 10) {
        this.isLoading = false;
        let message = HttpService.CheckErrorCode(res.status);
        this.error.message = message ? message : "wat";
        this.error.visible = true;
      }
      else {
        (async () => {
          await this.http.setToken(res.token);
          this.nav.setRoot(HomePage, {}, {animate: true, direction: "forward"});
        })();
      }
    })
  }

  register() {
    this.nav.setRoot(RegisterPage, {}, { animate: true, direction: 'forward' });
  }
}
