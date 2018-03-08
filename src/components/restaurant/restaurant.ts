import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import Tools from '../../tools/tools';

@Component({
  templateUrl: 'restaurant.html',
  selector: 'fd-restaurant'
})
export class RestaurantComponent {
  @Input('fdRestaurant') restaurant;
  stars = [];
  price = "";
  isInArchive = false;

  constructor(private event: Events) {
    // console.log(this.restaurant);
    // if (!this.restaurant.categories) this.restaurant.categories = [];
  }

  ngOnInit() {
    // this.generateStarsArray(this.restaurant.rating);
    this.generatePriceArray(this.restaurant.price);
  }

  generatePriceArray(price) {
    for (let i = 0; i < price; i++) {
      this.price += "$";
    }
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


  // This doesn't work well.
  // It's deprecated because it causes the details page to open anyway.
  archive(ev) {
    ev.preventDefault();
    Tools.Archive(this.restaurant);
    this.isInArchive = Tools.IsInArchive(this.restaurant);
    this.event.publish('fd:archiveChange');
  }
}
