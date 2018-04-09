import { NavController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { RegisterParams } from '../../models/requests.model';
import { LoginPage } from '../login/login';
import { WelcomeSurvey } from "../welcomeSurvey/welcomeSurvey";
import { RegisterRes } from '../../models/responses.model';

@Component({
  templateUrl: 'register.html',
  selector: 'page-register',
  providers: [HttpService]
})
export class RegisterPage {
  params: RegisterParams = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  error = {
    visible: false,
    message: ""
  };

  isLoading = false;

  constructor(private nav: NavController, private http: HttpService, private menu: MenuController) { }

  register() {
    this.error.visible = false;
    this.isLoading = true;
    this.http.Register(this.params).subscribe((res: any) => {
      console.log(res);
      if (res.status !== 10) {
        this.isLoading = false;
        let message = HttpService.CheckErrorCode(res.status);
        this.error.message = message ? message : "wat";
        this.error.visible = true;
      }
      else {
        (async () => {
          await this.http.setToken((<RegisterRes>res).data.token);
          this.menu.enable(true);
          this.nav.setRoot(WelcomeSurvey, {}, {animate: true, direction: "forward"});
        })();
      }
    });
  }

  login() {
    this.nav.setRoot(LoginPage, {}, { animate: true, direction: 'forward' });
  }
}
