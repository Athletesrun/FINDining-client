import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Group } from '../../models/group.model'
import { RestaurantPage } from '../restaurant/restaurant';
import Tools from "../../tools/tools";
import { HttpService } from '../../providers/http.service';
import { GetRestaurantFeedParams } from '../../models/requests.model';
import { Restaurant } from '../../models/restaurant.model';
import { GetRestaurantsRes } from '../../models/responses.model';
import { GroupMembersPage } from './group-members/group-members';

@Component({
  template: `
<ion-header>
  <ion-navbar [color]="'light'">
    <ion-title>
      {{headerText}}
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-tabs>
    <ion-tab [tabsHideOnSubPages]="true" [root]="recommendations" [rootParams]="p" tabIcon="list-box"></ion-tab>
    <ion-tab [tabsHideOnSubPages]="true" [rootParams]="p" tabIcon="heart"></ion-tab>
    <ion-tab [tabsHideOnSubPages]="true" [root]="members" [rootParams]="p" tabIcon="person"></ion-tab>
  </ion-tabs>
</ion-content>
  `,
  selector: 'page-group'
})
export class GroupPage {
  recommendations = GroupRecommendationsPage;
  members = GroupMembersPage;
  headerText;
  p;

  constructor(private params: NavParams) {
    this.p = params.data;
    this.headerText = params.get('group').name;
  }
}

@Component({
  templateUrl: 'group.html',
  selector: 'page-group',
  providers: [HttpService]
})
export class GroupRecommendationsPage {

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

/* 
  <ion-buttons right>
    <button ion-button icon-only clear (click)="openAddGroupMember()">
      <ion-icon name="person-add"></ion-icon>
    </button>
  </ion-buttons>
*/
