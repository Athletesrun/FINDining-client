import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { restaurants } from '../../assets/restaurants';
import { RestaurantPage } from '../restaurant/restaurant';
import { AccountPage } from '../account/account';
import { GroupsPage } from '../groups/groups';

import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public restaurants: Restaurant[] = restaurants;
  hasScrolledPastZero = false;
  cancelScrollListener = false;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
    this.scrollListener();
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

  scrollListener() {
    if (!this.cancelScrollListener) requestAnimationFrame(() => {
      let scroll = this.content.getNativeElement().children[1].scrollTop;
      if (scroll > 0) {
        this.hasScrolledPastZero = true;
      }
      else {
        this.hasScrolledPastZero = false;
      }
      this.scrollListener();
    })
  }

  getHasScrolled() {
    return this.content.scrollTop > 0;
  }

  openAccountPage() {
    this.navCtrl.push(AccountPage);
  }

  openGroupsPage() {
    this.navCtrl.push(GroupsPage);
  }

  ngOnDestroy() {
    this.cancelScrollListener = true;
  }

}
