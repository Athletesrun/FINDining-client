import { Component } from '@angular/core';

@Component({
  selector: 'page-friend-add',
  templateUrl: 'add-friend.html'
})
export class AddFriendPage {

  query;

  findUsers(e) {
    console.log(this.query);
  }

}
