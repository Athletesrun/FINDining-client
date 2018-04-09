import { Component } from "@angular/core";
import { NavController, Events } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { Group } from "../../models/group.model";
import { HttpService } from "../../providers/http.service";
import { GetGroupsRes } from "../../models/responses.model";
import { CreateGroupPage } from "./create-group/create-group";

@Component({
  templateUrl: 'groups.html',
  selector: 'page-groups',
  providers: [HttpService]
})
export class GroupsPage {

  groups: Group[] = [];
  loading = true;
  public hasNoGroups: boolean = false;
  error = {
    enabled: false,
    message: ""
  };

  constructor(private nav: NavController, private http: HttpService, event: Events) {
    event.subscribe('fd:updateGroups', (callback) => {
      this.getGroups(callback);
    })
  }

  ionViewDidEnter() {
    this.getGroups();
  }

  delete(index) {
    this.groups.splice(index, 1);
  }

  openGroup(group) {
    this.nav.push(GroupPage, {
      group: group
    })
  }

  openCreateGroup() {
    this.nav.push(CreateGroupPage);
  }

  getLastInArray(arr) {
    console.log(arr, arr.length);
    // return {name: "boop"}
    return arr[arr.length - 1];
  }

  getGroups(callback?) {
    this.error.enabled = false;
    this.loading = true;
    this.http.GetGroups().subscribe(res => {
      this.loading = false;
      if (res.status === 10) {
        if(this.groups.length === 0 && (<GetGroupsRes>res).data.length === 0) {
          this.hasNoGroups = true;
        } else {
          this.hasNoGroups = false;
        }
        this.groups = (<GetGroupsRes>res).data;
        if (callback) callback();
      }
      else {
        this.error.enabled = true;
        this.error.message = HttpService.CheckErrorCode(res.status);
      }
    })
  }
}
