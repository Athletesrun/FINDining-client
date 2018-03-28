import { Component } from "@angular/core";
import { HttpService } from "../../../providers/http.service";

@Component({
  templateUrl: 'group-members.html',
  selector: 'group-members-page',
  providers: [HttpService]
})
export class GroupMembersPage {

  members = [];

}
