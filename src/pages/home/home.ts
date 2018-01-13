import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { restaurants } from '../../assets/restaurants';
import { RestaurantPage } from '../restaurant/restaurant';
import { AccountPage } from '../account/account';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public restaurants = restaurants;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log(restaurants);
  }

  openDetailsPage(restaurant) {
    this.navCtrl.push(RestaurantPage, {
      rest: restaurant
    });
  }

  test(val) {
    console.log(val);
    return val;
  }

  getHasScrolled() {
    return this.content.scrollTop > 0;
  }

  openAccountPage() {
    this.navCtrl.push(AccountPage);
  }

}
