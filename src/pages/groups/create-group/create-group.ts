import { Component } from "@angular/core";
import { HttpService } from "../../../providers/http.service";

@Component({
  templateUrl: "create-group.html",
  selector: "page-group-create",
  providers: [HttpService]
})
export class CreateGroupPage {

  groupName = "";
  error: {
    visible: false,
    message: ""
  }


}
