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
  currentRestaurant = 0;

  constructor(private http: HttpService, private geo: Geolocation) {

  }

  ionViewDidLoad() {
    this.loadRestaurants();
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
        (<GetRestaurantsRes>res).data.map(restaurant => {
          this.restaurants.push(restaurant);
          this.currentRestaurants = [this.restaurants[0]];
        });
      }
    })
  }
}
