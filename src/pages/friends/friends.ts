import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FriendPage } from "./friend/friend";

@Component({
  templateUrl: 'friends.html',
  selector: 'friends-page'
})

export class FriendsPage {

  public friends: string[] = ["Emilie Brunson", "Joe Hansen", "Mike Downs", "Elizabeth Rhodes", "Mary Johnson", "James Anderson"];

  constructor(private navCtrl: NavController) {
    console.log(this.friends);
  }

  private openFriendsPage(event, friend) {
    this.navCtrl.push(FriendPage);
  }
}
