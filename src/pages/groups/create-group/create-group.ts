import { Component } from "@angular/core";
import { HttpService } from "../../../providers/http.service";
import { ModalController, NavController } from "ionic-angular";
import { LoadingPage } from "../../loading/loading";
import { GenericStatusRes } from "../../../models/responses.model";

@Component({
  templateUrl: "create-group.html",
  selector: "page-group-create",
  providers: [HttpService]
})
export class CreateGroupPage {

  groupName = "";
  friends: number[] = [];
  currentFriendToAdd = 0;
  newGroupId: number;
  loading: any;
  error = {
    visible: false,
    message: ""
  };

  constructor(private http: HttpService, private modal: ModalController, private nav: NavController) {}

  friendChange(data) {
    this.friends = data;
  }

  finish() {
    this.error.visible = false;
    if (this.groupName == "") {
      this.showError("Please enter a group name.");
      return;
    }
    this.loading = this.modal.create(LoadingPage);
    this.loading.present();
    this.http.CreateGroup({name: this.groupName}).subscribe(res => {
      if (res.status == 10) {
        this.newGroupId = (<any>res).data;
        if (this.friends !== []) {
          this.addFriend();
        }
        else {
          this.complete();
        }
      }
      else {
        this.showError(HttpService.CheckErrorCode(res.status));
        this.loading.dismiss();
      }
    })
  }

  addFriend() {
    if (this.currentFriendToAdd < this.friends.length) {
      this.http.AddToGroup({
        member: this.friends[this.currentFriendToAdd],
        groupId: this.newGroupId
      }).subscribe(res => {
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
    this.nav.pop().then(() => {
      this.loading.dismiss();
    })
  }

  showError(message) {
    this.error.visible = true;
    this.error.message = message;
  }

}
