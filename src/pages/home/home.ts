import { Component, ViewChild } from '@angular/core';
import { NavController, Content, PopoverController } from 'ionic-angular';

import { RestaurantPage } from '../restaurant/restaurant';
import { AccountPage } from '../account/account';
import { GroupsPage } from '../groups/groups';
import { ArchivePage } from '../archive/archive';
import { FilterPopover } from "./filter/filter";

import { OverflowPopover } from './overflow/overflow';

import { Restaurant } from '../../models/restaurant.model';
import {HttpService} from "../../providers/http.service";
import {GetRestaurantFeedParams} from "../../models/requests.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HttpService]
})

export class HomePage {

  public restaurants: Restaurant[] = [];
  hasScrolledPastZero = false;
  cancelScrollListener = false;

  params: GetRestaurantFeedParams = {
    distance: 10,
    price: 0,
    meal: "none"
  };

  restaurantSegment = 0;
  isLoading = false;

  @ViewChild(Content) content: Content;

  constructor(public nav: NavController, public pop: PopoverController, private http: HttpService) {

  }

  ngAfterViewInit() {
    this.scrollListener();
    this.updateRestaurants();
  }

  openDetailsPage(restaurant) {
    this.nav.push(RestaurantPage, {
      rest: restaurant
    });
  }

  scrollListener() {
    if (!this.cancelScrollListener) requestAnimationFrame(() => {
      let scroll = this.content.getNativeElement().children[1].scrollTop;
      this.hasScrolledPastZero = scroll > 0;
      this.scrollListener();
    })
  }

  updateRestaurants() {
    this.restaurantSegment = 0;
    this.restaurants = [];
    this.getRestaurants();
  }

  getRestaurants() {
    this.isLoading = true;
    this.http.GetRestaurantFeed(this.params, this.restaurantSegment).subscribe(res => {
      console.log(res);
      if (res.status === 10) {
        res.data.map(restaurant => {
          this.restaurants.push(restaurant);
        });
        this.restaurantSegment++;
      }
    })
  }

  getHasScrolled() {
    return this.content.scrollTop > 0;
  }

  openAccountPage() {
    this.nav.push(AccountPage);
  }

  openOverflowPopover(event) {
    const popover = this.pop.create(OverflowPopover, {
      nav: this.nav
    });
    popover.present({
      ev: event
    });
  }

  openFilterPopover(event) {
    let popover = this.pop.create(FilterPopover, Object.assign({}, this.params, {
      onChangeSource: data => {
        this.params = data;
        this.updateRestaurants();
      }
    }));
    popover.present({
      ev: event, // FilterPopover needs the event to determine where on the screen it should open
    });
  }

  ngOnDestroy() {
    this.cancelScrollListener = true;
  }
}
