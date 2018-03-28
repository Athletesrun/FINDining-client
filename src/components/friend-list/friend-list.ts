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

  @Input() exclude: number[] = [];

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
    console.log(this.exclude);
    this.http.GetFriends().subscribe(res => {
      if (res.status == 10) {
        let data = (<GetFriendsRes>res).data;
        if (this.exclude.length > 0) {
          let tmpData = [];
          data.map(d => this.exclude.indexOf(d.id) == -1 ? tmpData.push(d) : false);
          data = tmpData;
        }
        this.friends = data.map(d => {
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
