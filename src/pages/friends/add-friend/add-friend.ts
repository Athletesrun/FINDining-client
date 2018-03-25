import { Component } from '@angular/core';
import { HttpService } from "../../../providers/http.service";
import { GenericErrorRes, SearchUserRes } from "../../../models/responses.model";

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

  constructor (private http: HttpService) {}

  findUsers() {
    this.error.isError = false;
    this.loading = true;
    this.noResults = false;
    this.http.SearchUsers({name: this.query}).subscribe(res => {
      this.loading = false;
      if (res.status === 10) {
        this.results = (<SearchUserRes>res).data;
        if (this.results.length == 0) this.noResults = true;
      }
      else {
        this.error.isError = true;
        this.error.message = HttpService.CheckErrorCode((<GenericErrorRes>res).status);
      }
    });
    console.log(this.query);
  }

}
