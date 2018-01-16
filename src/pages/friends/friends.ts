import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'friends.html',
  selector: 'friends-page'
})

export class FriendsPage {

  public friends: string[] = ["Emilie Brunson", "Joe Hansen", "Mike Downs", "Elizabeth Rhodes", "Mary Johnson", "James Anderson"];

  constructor(private view: ViewController) { }
}
