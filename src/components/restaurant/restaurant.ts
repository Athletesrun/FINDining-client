import { Component, Input } from "@angular/core";

@Component({
  templateUrl: 'restaurant.html',
  selector: 'fd-restaurant'
})
export class RestaurantComponent {
  @Input('fdRestaurant') restaurant;
  stars = [];

  constructor() {

  }

  ngOnInit() {
    this.generateStarsArray(this.restaurant.rating);
  }

  generateStarsArray(rating) {
    for (let i = 0; i < 5; i++) {
      this.stars[i] = (() => {
        if (rating >= 1) return 2;
        else if (rating == .5) return 1;
        else return 0;
      })();
      rating -= 1;
    }
  }

  starName(type) {
    switch (type) {
      case 0:
        return 'star-outline';
      case 1:
        return 'star-half';
      case 2:
        return 'star';  
    }
  }
}
