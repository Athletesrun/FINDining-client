import { Component, ViewChild } from '@angular/core';
import { NavController, Content, PopoverController } from 'ionic-angular';

import { restaurants } from '../../assets/restaurants';

import { RestaurantPage } from '../restaurant/restaurant';
import { AccountPage } from '../account/account';
import { GroupsPage } from '../groups/groups';
import { ArchivePage } from '../archive/archive';
import { FilterPopover } from "./filter/filter";

import { OverflowPopover } from './overflow/overflow';

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

  constructor(public nav: NavController, public pop: PopoverController) {

  }

  ngAfterViewInit() {
    this.scrollListener();
  }

  openDetailsPage(restaurant) {
    this.nav.push(RestaurantPage, {
      rest: restaurant
    });
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
    let popover = this.pop.create(FilterPopover).present({
      ev: event // FilterPopover needs the event to determine where on the screen it should open
    });
  }

  ngOnDestroy() {
    this.cancelScrollListener = true;
  }
}
