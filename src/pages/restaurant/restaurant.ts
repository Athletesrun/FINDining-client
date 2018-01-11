import { Component, ViewChild } from "@angular/core";
import { Content, NavController, NavParams } from "ionic-angular";
import Vibrant from 'node-vibrant';
import tinycolor from 'tinycolor2';

@Component({
  selector: "page-restaurant",
  templateUrl: "restaurant.html"
})
export class RestaurantPage {

  restaurant;
  bg;
  stars = [];
  pathToImage;
  color;
  bgColor;
  cancelScrollListener = false;
  scrollPosition = 'start';
  hasScrolledDown = false;
  palette;

  @ViewChild(Content) content: Content;

  constructor(private params: NavParams, private nav: NavController) {
    this.restaurant = params.get('rest');
    this.pathToImage = "assets/imgs/placeholder/" + this.restaurant.img;
    this.bg = {
      'background-image': `url(${this.pathToImage})`
    };
    this.generateStarsArray(this.restaurant.rating);
    this.generateColors();
  }

  ngAfterContentInit() {
    this.scrollListener();
    // console.log(this.content);
  }

  getWideWindowStartRule(scroll) {
    return (window.innerWidth > window.innerHeight ? scroll <= window.innerHeight * .75 : false)
  }

  getWideWindowEndRule(scroll) {
    return (window.innerWidth > window.innerHeight ? scroll > window.innerHeight * .75 : false)
  }

  scrollListener() {
    if (!this.cancelScrollListener) requestAnimationFrame(() => {
      let scroll = this.content.getNativeElement().children[1].scrollTop;
      if (scroll <= window.innerWidth || this.getWideWindowStartRule(scroll)) {
        this.scrollPosition = "start";
      }
      if (scroll > window.innerWidth || this.getWideWindowEndRule(scroll)) {
        this.scrollPosition = "end";
        this.hasScrolledDown = true;
      }
      this.scrollListener();
    })
  }

  generateColors() {
    let v = new Vibrant(this.pathToImage);
    v.getPalette().then((palette) => {
      this.palette = palette;
      let m = palette.Muted;
      if (tinycolor({r: m.r, g: m.g, b: m.b}).isLight()) {
        this.chooseArrowColor("#fff", this.color);
        this.chooseArrowColor("#000", this.bgColor);
      }
      else {
        this.chooseArrowColor("#000", this.color);
        this.chooseArrowColor("#fff", this.bgColor);
      }
    })
  }

  chooseArrowColor(color, name) {
    name = color;
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

  back() {
    this.cancelScrollListener = true;
    this.nav.pop();
  }
}
