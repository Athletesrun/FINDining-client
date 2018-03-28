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
  public restaurants = [
    {
      name: "American Heroes"
    },
    {
      name: "My Pie Pizza"
    },
    {
      name: "La Esmeralda"
    },
    {
      name: "Pickleman's Gourmet Cafe"
    },
    {
      name: "China Wok"
    }
  ];

  friends = ["Aidan Buechler", "Daniel Noon", "Ben Wingerter"];

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.friend = navParams.data.friend;
  }
}
