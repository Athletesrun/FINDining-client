import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FriendPage } from "./friend/friend";
import { AddFriendPage } from "./add-friend/add-friend";
import { Friend } from '../../models/friend.model';
import { HttpService } from '../../providers/http.service';
import { GetFriendsRes } from '../../models/responses.model';

@Component({
  templateUrl: 'friends.html',
  selector: 'friends-page',
  providers: [HttpService]
})

export class FriendsPage {

  public hasNoFriends:boolean = false;
  public friends: Friend[] = [];
  error = {
    visible: false,
    message: ""
  };

  constructor(private navCtrl: NavController, private http: HttpService) { }

  ionViewDidEnter() {
    this.getFriends();
  }

  getFriends() {
    this.http.GetFriends().subscribe(res => {
      if (res.status == 10) {
        this.friends = (<GetFriendsRes>res).data;
        this.hasNoFriends = this.friends.length === 0;
      }
      else {
        this.error.visible = true;
        this.error.message = HttpService.CheckErrorCode(res.status);
      }
    })
  }

  openFriendPage(event, friend) {
    this.navCtrl.push(FriendPage, {
      friend: friend
    });
  }

  openAddFriendPage() {
    this.navCtrl.push(AddFriendPage);
  }

}
