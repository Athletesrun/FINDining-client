import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthService } from "../../app/auth/auth.service";

@Component({
  templateUrl: 'account.html',
  selector: 'page-account',
  providers: [AuthService]
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
      name: "Test Login",
      action: () => this.auth.login()
    },
    {
      name: "Log Out"
    }
  ];

  constructor(private nav: NavController, private auth: AuthService) { }

} 