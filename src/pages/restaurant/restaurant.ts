import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";


@Component({
  selector: "page-restaurant",
  templateUrl: "restaurant.html"
})
export class RestaurantPage {

  restaurant;

  constructor(private params: NavParams) {
    this.restaurant = params.get('rest');
  }

}
