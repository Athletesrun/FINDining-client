import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

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
  }
}
