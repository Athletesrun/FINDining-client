import { GetRestaurantsRes } from '../../models/responses.model';
import { Component, ViewChild, NgZone, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, Content, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { RestaurantPage } from '../restaurant/restaurant';
import { AccountPage } from '../account/account';
import { FilterPopover } from "./filter/filter";

import { Restaurant } from '../../models/restaurant.model';
import { HttpService } from "../../providers/http.service";
import { GetRestaurantFeedParams } from "../../models/requests.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HttpService]
})

export class HomePage implements AfterViewInit {

  public restaurants: Restaurant[] = [];
  currentIndex = 0;
  currentRestaurant: Restaurant;
  leftRestaurant: Restaurant;
  rightRestaurant: Restaurant;
  currentRestaurantClass = 'center';
  leftRestaurantClass = 'left';
  rightRestaurantClass = 'right';
  showHelp = false;

  private allowedRadius: number = 0.6; //degrees
  private omahaLatitude: number = 41.263074;
  private omahaLongitude: number = -96.023956;

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
  disableSwipe = false;

  @ViewChild(Content) content: Content;
  @ViewChild('loading', {read: ElementRef}) loading: ElementRef;

  constructor(
    public nav: NavController,
    public pop: PopoverController,
    private http: HttpService,
    private zone: NgZone,
    private geo: Geolocation,
    private storage: Storage
  ) {}

  ngAfterViewInit() {
    this.storage.ready().then(() => {
      this.updateRestaurants();
    });
  }

  openDetailsPage(restaurant) {
    this.nav.push(RestaurantPage, {
      rest: restaurant
    });
  }

  swipeLeft() {
    if (this.showHelp) {
      this.showHelp = false;
      this.storage.set("helpShown", true);
    }
    if (this.currentIndex >= this.restaurants.length - 1) return;
    if (this.currentIndex >= this.restaurants.length - 2) this.getRestaurants();
    this.disableSwipe = true;
    this.currentRestaurantClass = 'center-to-left';
    this.rightRestaurantClass = 'right-to-center';
    setTimeout(() => {
      this.currentIndex++;
      this.leftRestaurant = this.currentRestaurant;
      this.currentRestaurant = this.rightRestaurant;
      this.rightRestaurant = this.restaurants[this.currentIndex + 1];
      this.currentRestaurantClass = 'center';
      this.rightRestaurantClass = 'right';
      this.disableSwipe = false;
    }, 300);
  }

  swipeRight() {
    if (this.currentIndex <= 0) return;
    this.currentRestaurantClass = 'center-to-right';
    this.leftRestaurantClass = 'left-to-center';
    this.disableSwipe = true;
    setTimeout(() => {
      this.currentIndex--;
      this.rightRestaurant = this.currentRestaurant;
      this.currentRestaurant = this.leftRestaurant;
      this.leftRestaurant = this.restaurants[this.currentIndex - 1];
      this.currentRestaurantClass = 'center';
      this.leftRestaurantClass = 'left';
      this.disableSwipe = false;
    }, 300);
  }

  swipeHandler(e) {
    if (this.disableSwipe) return;
    e.direction == 4 ? this.swipeRight() : this.swipeLeft();
  }

  updateRestaurants() {
    this.isLoading = true;
    this.error.visible = false;
    this.restaurantSegment = 0;
    this.restaurants = [];
    this.geo.getCurrentPosition().then((res) => {
      if((res.coords.latitude >= this.omahaLatitude - this.allowedRadius && res.coords.latitude <= this.omahaLatitude + this.allowedRadius)
        && (res.coords.longitude >= this.omahaLongitude - this.allowedRadius && res.coords.longitude <= this.omahaLongitude + this.allowedRadius))
      {
        this.params.latitude = res.coords.latitude;
        this.params.longitude = res.coords.longitude;
        this.getRestaurants();
      } else {
        this.isLoading = false;
        this.error.visible = true;
        this.error.message = "We're sorry! FINDining is currently only available in the Omaha, NE area.";
      }
    }).catch((error) => {
      this.isLoading = false;
      console.log('Error getting location', error);
      this.error.visible = true;
      this.error.message = "FINDining can't get your location. FINDining requires location access in order to recommend nearby restaurants";
    });
  }

  getRestaurants() {
    if (this.isGettingNewRestaurants) return;
    this.isGettingNewRestaurants = true;
    const params: GetRestaurantFeedParams = Object.assign({}, this.params, {
      distance: this.params.distance / 0.00062137
    });
    this.http.GetRestaurantFeed(params, this.restaurantSegment).subscribe(res => {
      this.isLoading = false;
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
        if (this.currentIndex > 0)
          this.leftRestaurant = this.restaurants[this.currentIndex - 1];
        this.currentRestaurant = this.restaurants[this.currentIndex];
        if (this.currentIndex < this.restaurants.length)
          this.rightRestaurant = this.restaurants[this.currentIndex + 1];
        this.storage.get("helpShown").then(show => {
          if (!show) this.showHelp = true;
        })
      }
      else {
        this.error.visible = true;
        this.error.message = HttpService.CheckErrorCode(res.status, res.message);
      }
    })
  }

  openAccountPage() {
    this.nav.push(AccountPage);
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
}
