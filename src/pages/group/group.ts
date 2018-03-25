import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Group } from '../../models/group.model'
import { RestaurantPage } from '../restaurant/restaurant';
import Tools from "../../tools/tools";

@Component({
  templateUrl: 'group.html',
  selector: 'page-group'
})
export class GroupPage {

  group: Group;
  headerText;

  constructor(private nav: NavController, private params: NavParams) {
    this.group = params.get('group');
    this.headerText = this.group.name
    // Tools.JoinArrayAsList(this.group.members, "and");
  }

  openRestaurant(rest) {
    this.nav.push(RestaurantPage, {
      rest: rest
    })
  }

}
