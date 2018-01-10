import {Component, ViewChild} from '@angular/core';
import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public restaurants = [
    {
      name: "Block 16",
      url: "http://block16omaha.com/",
      img: "block16.jpg",
      rating: 4.5,
      price: 1,
      eta: 23,
      category: [
        "Sandwiches",
        "American"
      ],
      address: [
        "1611 Farnam St",
        "Omaha, NE 68102"
      ]
    },
    {
      name: "The Drover",
      url: "http://www.droverrestaurant.com/",
      img: "drover.jpg",
      rating: 4,
      price: 3,
      eta: 17,
      category: [
        "Steakhouse"
      ],
      address: [
        "2121 S 73rd St",
        "Omaha, NE 68124"
      ]
    }
  ];

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController) {

  }

  getHasScrolled() {
    return this.content.scrollTop > 0;
  }

}
