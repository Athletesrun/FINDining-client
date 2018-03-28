import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Group } from '../../models/group.model'
import { RestaurantPage } from '../restaurant/restaurant';
import Tools from "../../tools/tools";
import { HttpService } from '../../providers/http.service';
import { GetRestaurantFeedParams } from '../../models/requests.model';
import { Restaurant } from '../../models/restaurant.model';
import { GetRestaurantsRes } from '../../models/responses.model';

@Component({
  templateUrl: 'group.html',
  selector: 'page-group',
  providers: [HttpService]
})
export class GroupPage {

  group: Group;
  headerText;
  loading = false;
  segment = 0;
  parameters: GetRestaurantFeedParams = {
    distance: 10,
    price: 3,
    meal: "breakfast",
    latitude: 10,
    longitude: 10
  };
  restaurants: Restaurant[] = [];
  error = {
    visible: false,
    message: ""
  };

  constructor(
    private nav: NavController,
    private params: NavParams,
    private http: HttpService
  ) {
    this.group = params.get('group');
    this.headerText = this.group.name;
    console.log(this.group);
    // Tools.JoinArrayAsList(this.group.members, "and");
  }

  ionViewDidLoad() {
    this.getRecommendations();
  }

  getRecommendations() {
    this.loading = true;
    this.http.GetGroupRecommendations(this.group.id, this.segment, this.parameters).subscribe(res => {
      this.loading = false;
      if (res.status == 10) {
        this.restaurants = (<GetRestaurantsRes>res).data;
      }
      else {
        this.error.visible = true;
        this.error.message = HttpService.CheckErrorCode(res.status);
      }
    })
  }

  openRestaurant(rest) {
    this.nav.push(RestaurantPage, {
      rest: rest
    })
  }

}
