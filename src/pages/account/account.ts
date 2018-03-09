import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import {HttpService} from "../../providers/http.service";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'account.html',
  selector: 'page-account',
  providers: [HttpService]
})
export class AccountPage {

  private settings: Array<object> = [
    {
      name: "Change Name"
    },
    {
      name: "Change Email"
    },
    {
      name: "Change Password"
    },
    {
      name: "Log Out",
      action: () => {
        this.http.signOut().then(() => {
          this.nav.setRoot(LoginPage, {}, {animate: true, direction: "backward"});
        })
      }
    }
  ];

  constructor(private nav: NavController, private http: HttpService) { }

}
