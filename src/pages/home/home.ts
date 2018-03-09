import { GetRestaurantsRes } from './../../models/responses.model';
import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { NavController, Content, PopoverController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { RestaurantPage } from '../restaurant/restaurant';
import { AccountPage } from '../account/account';
import { GroupsPage } from '../groups/groups';
import { ArchivePage } from '../archive/archive';
import { FilterPopover } from "./filter/filter";

import { OverflowPopover } from './overflow/overflow';

import { Restaurant } from '../../models/restaurant.model';
import { HttpService } from "../../providers/http.service";
import { GetRestaurantFeedParams } from "../../models/requests.model";
import { LoadingComponent } from '../../components/loading/loading';

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
    meal: "none",
    latitude: 41.2523630,
    longitude: -95.9979880
  };

  error = {
    visible: false,
    message: ""
  };

  restaurantSegment = 0;
  isLoading = false;
  isGettingNewRestaurants = false;

  @ViewChild(Content) content: Content;
  @ViewChild('loading', {read: ElementRef}) loading: ElementRef;

  constructor(
    public nav: NavController,
    public pop: PopoverController,
    private http: HttpService,
    private zone: NgZone,
    private geo: Geolocation
  ) {

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

  loadListener(e) {
    if (this.isLoading) {
      this.zone.run(() => {
        if (e.scrollTop + e.scrollHeight > this.loading.nativeElement.offsetTop) {
          this.getRestaurants();
        }
      })
    }
  }

  updateRestaurants() {
    this.error.visible = false;
    this.restaurantSegment = 0;
    this.restaurants = [];
    this.geo.getCurrentPosition().then((res) => {
      this.params.latitude = res.coords.latitude;
      this.params.longitude = res.coords.longitude;
      this.getRestaurants();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.error.visible = true;
      this.error.message = "Unable to get location.";
    });
  }

  getRestaurants() {
    if (this.isGettingNewRestaurants) return;
    this.isGettingNewRestaurants = true;
    this.isLoading = true;
    const params: GetRestaurantFeedParams = Object.assign({}, this.params, {
      distance: this.params.distance / 0.00062137
    })
    this.http.GetRestaurantFeed(this.params, this.restaurantSegment).subscribe(res => {
      console.log(res);
      if (res.status === 10) {
        if ((<GetRestaurantsRes>res).data.length === 0) {
          this.isLoading = false;
          return;
        }
        (<GetRestaurantsRes>res).data.map(restaurant => {
          this.restaurants.push(restaurant);
        });
        this.restaurantSegment++;
        setTimeout(() => this.isGettingNewRestaurants = false, 2000);        
      }
      else {
        this.error.visible = true;
        this.error.message = HttpService.CheckErrorCode(res.status, res.message);
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
