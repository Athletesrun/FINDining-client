import {Component, Input} from "@angular/core";

@Component({
  templateUrl: 'restaurant.html',
  selector: 'fd-restaurant'
})
export class RestaurantComponent {
  @Input('fdRestaurant') restaurant;

  constructor() {
  }
}
