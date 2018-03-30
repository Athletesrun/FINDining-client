import { Component } from "@angular/core";
import { HttpService } from "../../../providers/http.service";
import { NavParams, NavController } from "ionic-angular";
import { Group } from "../../../models/group.model";
import { GetUserByIdRes } from "../../../models/responses.model";
import { AddGroupMemberPage } from "../add-group-member/add-group-member";

@Component({
  templateUrl: 'group-members.html',
  selector: 'group-members-page',
  providers: [HttpService]
})
export class GroupMembersPage {

  members = [];
  group: Group;
  error = {
    visible: false,
    message: ""
  };

  constructor(private nav: NavController, params: NavParams, private http: HttpService) {
    this.group = params.get('group');
  }

  ionViewDidEnter() {
    this.getMembers();
  }

  getMembers() {
    this.members = [];
    for (let memberId of this.group.members) {
      this.http.GetUserById(memberId).subscribe(res => {
        if (res.status == 10) {
          this.members.push((<GetUserByIdRes>res).data[0]);
        }
        else {
          this.error.visible = true;
          this.error.message = HttpService.CheckErrorCode(res.status);
        }
      })
    }
  }

  openAddGroupMember() {
    this.nav.push(AddGroupMemberPage, {
      currentMembers: this.group.members,
      groupId: this.group.id
    });
  }

}
