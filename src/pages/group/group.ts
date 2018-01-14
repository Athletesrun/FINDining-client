import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Group } from '../../models/group.model'
import { RestaurantPage } from '../restaurant/restaurant';

@Component({
  templateUrl: 'group.html',
  selector: 'page-group'
})
export class GroupPage {

  group: Group;

  constructor(private nav: NavController, private params: NavParams) {
    this.group = params.get('group');
  }

  openRestaurant(rest) {
    this.nav.push(RestaurantPage, {
      rest: rest
    })
  }

}
