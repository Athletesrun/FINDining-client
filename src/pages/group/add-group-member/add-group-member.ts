import { Component } from "@angular/core";
import { HttpService } from "../../../providers/http.service";
import { NavParams, ModalController, NavController, Events } from "ionic-angular";
import { LoadingPage } from "../../loading/loading";

@Component({
  templateUrl: 'add-group-member.html',
  selector: 'page-group-member-add',
  providers: [HttpService]
})
export class AddGroupMemberPage {
  newMembers: number[] = [];
  currentMembers: number[] = [];
  currentFriendToAdd = 0;
  groupId = 0;
  loading;
  error = {
    visible: false,
    message: ""
  };

  constructor(private nav: NavController, private view: NavParams, private modal: ModalController, private http: HttpService, private event: Events) {
    this.currentMembers = view.get('currentMembers');
    this.groupId = view.get('groupId');
  }

  setMembers(friends) {
    this.newMembers = friends;
    console.log(this.newMembers);
  }

  finish() {
    this.error.visible = false;
    this.loading = this.modal.create(LoadingPage);
    this.loading.present();
    if (this.newMembers !== []) {
      this.addFriend();
    }
    else {
      this.complete();
    }
  }

  addFriend() {
    console.log(this);
    if (this.currentFriendToAdd < this.newMembers.length) {
      this.http.AddToGroup({
        member: this.newMembers[this.currentFriendToAdd],
        groupId: this.groupId
      }).subscribe(res => {
        console.log(res);
        if (res.status == 10) {
          this.currentFriendToAdd++;
          this.addFriend();
        }
        else {
          this.showError(HttpService.CheckErrorCode(res.status));
          this.loading.dismiss();
        }
      })
    }
    else {
      this.complete();
    }
  }

  complete() {
    this.event.publish('fd:updateGroups', () => {
      this.nav.pop().then(() => {
        this.loading.dismiss();
      })
    })
  }

  showError(message) {
    this.error.visible = true;
    this.error.message = message;
  }

  addMember() {

  }
}
