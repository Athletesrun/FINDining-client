import { Component } from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import { HttpService } from "../../providers/http.service";
import { Restaurant } from "../../models/restaurant.model";

@Component({
  selector: "page-rate",
  templateUrl: "rate.html",
  providers: [HttpService]
})
export class RatePage {
  restaurant: Restaurant;
  isLoading = false;
  stars = (new Array(5)).map((d, i) => i == 0);

  constructor(private params: NavParams, private http: HttpService, private nav: NavController) {
    this.restaurant = params.get("restaurant");
    this.stars[0] = true;
  }

  clickStar(i) {
    for (let star = 0; star <= 4; star++) {
      console.log(star <= i);
      this.stars[star] = (star <= i);
    }
  }

  submit() {
    this.isLoading = true;
    let rating = 0;
    for (let star of this.stars) {
      rating += star ? 1 : 0;
    }
    console.log(this.restaurant);
    this.http.ReviewRestaurant({
      rating,
      restaurantId: this.restaurant.yelp_id
    }).subscribe(res => {
      this.isLoading = false;
      if (res.status === 10) {
        this.nav.pop();
      }
    })
  }
}
