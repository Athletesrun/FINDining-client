import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { restaurants } from "../../../assets/restaurants";

@Component({
  templateUrl: "friend.html",
  providers: [],
  selector: "friend-page"
})

export class FriendPage {

  public friend: string = "";
  public restaurants: object[];

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.friend = navParams.data.friend;
    this.restaurants = restaurants;
  }
}
