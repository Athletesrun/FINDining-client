import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  templateUrl: 'account.html',
  selector: 'page-account'
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
      name: "Log Out"
    }
  ];

  constructor(private nav: NavController) { }

} 