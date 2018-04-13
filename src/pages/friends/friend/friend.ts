import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Friend } from '../../../models/friend.model';
import { Restaurant } from '../../../models/restaurant.model';

@Component({
  templateUrl: "friend.html",
  providers: [],
  selector: "friend-page"
})

export class FriendPage {

  public friend: Friend;
  public restaurants = [];
  public friends = [];

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.friend = navParams.data.friend;
    console.log(this.friend);
  }
}
