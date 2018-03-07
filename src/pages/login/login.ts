import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { RegisterPage } from '../register/register';
import { LoginParams } from '../../models/requests.model';

@Component({
  templateUrl: 'login.html',
  selector: 'page-login',
  providers: [HttpService]
})
export class LoginPage {
  params: LoginParams = {
    email: "",
    password: ""
  }

  error = {
    visible: false,
    message: ""
  }

  isLoading = false;

  constructor(private nav: NavController, private http: HttpService) { }

  login() {
    this.http.Login(this.params).subscribe((res: any) => {
      if (res.status !== 10) {
        let message = HttpService.CheckErrorCode(res.status);
        this.error.message = message ? message : "wat";
        this.error.visible = true;
      }
      console.log(res);
    })
  }

  register() {
    this.nav.setRoot(RegisterPage, {}, { animate: true, direction: 'forward' });
  }
}