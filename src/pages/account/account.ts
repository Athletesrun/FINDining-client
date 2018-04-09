import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { HttpService } from "../../providers/http.service";
import { LoginPage } from "../login/login";
import { AboutPage } from "./about/about";

@Component({
  templateUrl: 'account.html',
  selector: 'page-account',
  providers: [HttpService]
})
export class AccountPage {

  private settings: Array<object> = [
    // {
    //   name: "Change Name"
    // },
    // {
    //   name: "Change Email"
    // },
    // {
    //   name: "Change Profile Picture"
    // },
    // {
    //   name: "Change Password"
    // },
    {
      name: "About FINDining",
      action: () => {
        this.nav.push(AboutPage, {});
      }
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
