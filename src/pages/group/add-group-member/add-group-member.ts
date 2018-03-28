import { Component } from "@angular/core";
import { HttpService } from "../../../providers/http.service";
import { NavParams } from "ionic-angular";

@Component({
  templateUrl: 'add-group-member.html',
  selector: 'group-member-add-page',
  providers: [HttpService]
})
export class AddGroupMemberPage {
  newMembers: number[] = [];
  currentMembers: number[] = [];

  constructor(private view: NavParams) {
    this.currentMembers = view.get('currentMembers');
  }

  setMembers(friends) {
    this.newMembers = friends;
    console.log(this.newMembers);
  }
}
