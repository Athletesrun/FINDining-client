import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HttpService } from "../../providers/http.service";
import { Friend } from "../../models/friend.model";
import { GetFriendsRes } from "../../models/responses.model";

@Component({
  selector: 'fd-friend-list',
  templateUrl: 'friend-list.html',
  providers: [HttpService]
})
export class FriendListComponent {
  selectedFriends = {};
  friends: (Friend & {selected: boolean})[];
  error = {
    visible: false,
    message: ""
  };

  constructor(private http: HttpService) {}

  @Input()
  get friendIds() {
    return this.friends;
  }

  @Output() updateFriendIds = new EventEmitter();
  set friendIds(val) {
    this.friends = val;
    this.updateFriendIds.emit(this.friends);
  }

  selectFriend(friend, e) {
    this.friends[friend].selected = e.checked;
    let checkedFriends = [];
    for (let friend of this.friends) {
      if (friend.selected) checkedFriends.push(friend.id);
    }
    this.updateFriendIds.emit(checkedFriends);
  }

  ngOnInit() {
    this.getFriends();
  }

  getFriends() {
    this.http.GetFriends().subscribe(res => {
      if (res.status == 10) {
        this.friends = (<GetFriendsRes>res).data.map(d => {
          return Object.assign({}, d, {selected: false})
        });
      }
      else {
        this.error.visible = true;
        this.error.message = HttpService.CheckErrorCode(res.status);
      }
    })
  }

}
