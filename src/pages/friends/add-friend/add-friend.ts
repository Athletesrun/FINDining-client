import { Component } from '@angular/core';
import { HttpService } from "../../../providers/http.service";
import { GenericErrorRes, SearchForFriendRes } from "../../../models/responses.model";
import { Events } from "ionic-angular";

@Component({
  selector: 'page-friend-add',
  templateUrl: 'add-friend.html',
  providers: [HttpService]
})
export class AddFriendPage {

  query;
  results = [];
  noResults = false;
  loading = false;
  showHelpText = true;
  error = {
    isError: false,
    message: ""
  };

  constructor (private http: HttpService, private event: Events) {}

  findUsers() {
    this.noResults = false;
    this.error.isError = false;
    if (this.query.length == 0) {
      this.results = [];
      return;
    }
    this.loading = true;
    this.http.SearchForFriend(this.query).subscribe(res => {
      this.loading = false;
      if (res.status === 10) {
        this.results = (<SearchForFriendRes>res).data;
        if (this.results.length == 0) this.noResults = true;
      }
      else {
        this.error.isError = true;
        this.error.message = HttpService.CheckErrorCode((<GenericErrorRes>res).status);
      }
    });
  }

  toggleFriendship(user) {
    user.alreadyFriend ? this.removeFriend(user) : this.addFriend(user);
  }

  addFriend(user) {
    this.error.isError = false;
    return this.http.AddFriend({ userId: user.id }).subscribe(res => {
      if (res.status == 10) {
        user.alreadyFriend = !user.alreadyFriend;
      }
      else {
        this.error.isError = true;
        this.error.message = HttpService.CheckErrorCode((<GenericErrorRes>res).status);
      }
    })
  }

  removeFriend(user) {
    this.error.isError = false;
    return this.http.RemoveFriend({ userId: user.id }).subscribe(res => {
      if (res.status == 10) {
        user.alreadyFriend = !user.alreadyFriend;
      }
      else {
        this.error.isError = true;
        this.error.message = HttpService.CheckErrorCode((<GenericErrorRes>res).status);
      }
    })
  }

}
