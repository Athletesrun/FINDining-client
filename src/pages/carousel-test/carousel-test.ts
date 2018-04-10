import { Component } from "@angular/core";
import { HttpService } from "../../providers/http.service";
import { Restaurant } from "../../models/restaurant.model";
import { GetRestaurantFeedParams } from "../../models/requests.model";
import { Geolocation } from "@ionic-native/geolocation";
import { GetRestaurantsRes } from "../../models/responses.model";

@Component({
  selector: 'page-carousel-test',
  templateUrl: 'carousel-test.html',
  providers: [HttpService]
})
export class CarouselTestPage {
  
  restaurants: Restaurant[] = [];
  currentRestaurants: Restaurant[] = [];
  params: GetRestaurantFeedParams = {
    distance: 10,
    price: 0,
    meal: "none",
    latitude: 41.2523630,
    longitude: -95.9979880
  };
  currentIndex = 0;
  currentRestaurant: Restaurant;
  leftRestaurant: Restaurant;
  rightRestaurant: Restaurant;
  currentRestaurantClass = 'center';
  leftRestaurantClass = 'left';
  rightRestaurantClass = 'right';

  constructor(private http: HttpService, private geo: Geolocation) {

  }

  ionViewDidLoad() {
    this.loadRestaurants();
  }

  swipeLeft() {
    this.currentRestaurantClass = 'center-to-left';
    this.rightRestaurantClass = 'right-to-center';
    setTimeout(() => {
      this.currentIndex++;
      this.leftRestaurant = this.currentRestaurant;
      this.currentRestaurant = this.rightRestaurant;
      this.rightRestaurant = this.restaurants[this.currentIndex + 1];
      this.currentRestaurantClass = 'center';
      this.rightRestaurantClass = 'right';
    }, 300);
  }

  swipeRight() {
    this.currentRestaurantClass = 'center-to-right';
    this.leftRestaurantClass = 'left-to-center';
    setTimeout(() => {
      this.currentIndex--;
      this.rightRestaurant = this.currentRestaurant;
      this.currentRestaurant = this.leftRestaurant;
      this.leftRestaurant = this.restaurants[this.currentIndex - 1];
      this.currentRestaurantClass = 'center';
      this.leftRestaurantClass = 'left';
    }, 300);
  }

  swipeHandler(e) {
    e.direction == 4 ? this.swipeRight() : this.swipeLeft();
  }

  loadRestaurants() {
    this.restaurants = [];
    this.geo.getCurrentPosition().then((res) => {
      this.params.latitude = res.coords.latitude;
      this.params.longitude = res.coords.longitude;
      this.getRestaurants();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getRestaurants() {
    const params: GetRestaurantFeedParams = Object.assign({}, this.params, {
      distance: this.params.distance / 0.00062137
    })
    this.http.GetRestaurantFeed(params, 0).subscribe(res => {
      if (res.status === 10) {
        if ((<GetRestaurantsRes>res).data.length === 0) {
          return;
        }
        this.restaurants = (<GetRestaurantsRes>res).data;
        if (this.currentIndex > 0)
          this.leftRestaurant = this.restaurants[this.currentIndex - 1];
        this.currentRestaurant = this.restaurants[this.currentIndex];
        if (this.currentIndex < this.restaurants.length)
          this.rightRestaurant = this.restaurants[this.currentIndex + 1];
      }
    })
  }
}
