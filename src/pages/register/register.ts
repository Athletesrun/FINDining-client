import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { RegisterParams } from '../../models/requests.model';
import { LoginPage } from '../login/login';

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
  }

  error = {
    visible: false,
    message: ""
  }

  constructor(private nav: NavController, private http: HttpService) { }

  register() {
    this.http.Register(this.params).subscribe((data) => {
      console.log(data);
    })
  }

  login() {
    this.nav.setRoot(LoginPage, {}, { animate: true, direction: 'forward' });
  }
}