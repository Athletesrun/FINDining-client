import { Component, OnInit } from "@angular/core";
import { Restaurant } from "../../../models/restaurant.model";
import { HttpService } from "../../../providers/http.service";
import { Group } from "../../../models/group.model";
import { GetRestaurantsRes } from "../../../models/responses.model";
import { NavParams } from "ionic-angular";

@Component({
  selector: 'page-group-favorites',
  templateUrl: 'favorites.html',
  providers: [HttpService]
})
export class GroupFavoritesPage {
  restaurants: Restaurant[];
  group: Group;
  loading = false;
  error = {
    visible: false,
    message: ""
  }

  constructor(private http: HttpService, private params: NavParams) {
    this.group = params.get('group');
  }

  ionViewDidEnter() {
    this.loading = true;
    this.error.visible = false;
    this.http.GetGroupFavorites(this.group.id).subscribe(res => {
      if (res.status === 10) {
        this.loading = false;
        this.restaurants = (<GetRestaurantsRes>res).data;
      }
      else {
        this.error.visible = true;
        this.error.message = HttpService.CheckErrorCode(res.status);
      }
    })
  }

  updateFavorites() {
    
  }
}
