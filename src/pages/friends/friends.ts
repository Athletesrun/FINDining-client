import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FriendPage } from "./friend/friend";
import { AddFriendPage } from "./add-friend/add-friend";

@Component({
  templateUrl: 'friends.html',
  selector: 'friends-page'
})

export class FriendsPage {

  public friends: string[] = ["Emilie Brunson", "Joe Hansen", "Mike Downs", "Elizabeth Rhodes", "Mary Johnson", "James Anderson"];

  constructor(private navCtrl: NavController) {}

  openFriendPage(event, friend) {
    this.navCtrl.push(FriendPage, {
      friend: friend
    });
  }

  openAddFriendPage() {
    this.navCtrl.push(AddFriendPage);
  }

}
