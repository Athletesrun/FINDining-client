import { Component, ViewChild } from "@angular/core";
import { Content, NavController, NavParams, Events, Platform, PopoverController } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { Restaurant } from "../../models/restaurant.model";
import Tools from "../../tools/tools";
import Vibrant from 'node-vibrant';
import tinycolor from 'tinycolor2';
import mapboxgl from 'mapbox-gl';
import { RatePage } from "../rate/rate";

@Component({
  selector: "page-restaurant",
  templateUrl: "restaurant.html"
})
export class RestaurantPage {

  restaurant: Restaurant;
  stars = [];
  price = "";
  cancelScrollListener = false;
  scrollPosition = 'start';
  hasScrolledDown = false;
  isInArchive = false;
  bg;
  pathToImage;
  color;
  bgColor;
  palette;
  map;
  mapMarker;
  categories = "";

  @ViewChild(Content) content: Content;
  @ViewChild('map') mapElement;

  constructor(
    private params: NavParams,
    private nav: NavController,
    private sb: StatusBar,
    private event: Events,
    private plt: Platform,
    private pop: PopoverController
  ) {
    sb.overlaysWebView(false);
    sb.backgroundColorByHexString("#fafafa");
    this.restaurant = params.get('rest');
    this.categories = this.restaurant.categories.values.map(d => d.title).join(", ");
    this.pathToImage = this.restaurant.image_url || 'assets/placeholder/placeholder.png';
    this.bg = {
      'background-image': `url(${this.pathToImage})`
    };
    this.generateStarsArray(this.restaurant.rating);
    this.generatePriceArray(this.restaurant.price);
    this.isInArchive = Tools.IsInArchive(this.restaurant);
    this.generateColors();
  }

  ngAfterContentInit() {
    this.scrollListener();
    this.initMap();
  }

  initMap() {
    console.log(this.restaurant);
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VwZXJtZWdhZGV4IiwiYSI6ImNqNnc4c242NDFjcG0zMm56MzlqMDk1czMifQ.gFotKrTtsriSfvGxKVzsoA';
    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [this.restaurant.longitude, this.restaurant.latitude],
      zoom: 15
    });
    let el = document.createElement("img");
    el.src = "assets/pin.svg";
    this.mapMarker = new mapboxgl.Marker(el)
      .setLngLat([this.restaurant.longitude, this.restaurant.latitude])
      .addTo(this.map);
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
      this.bgColor = '#fff';
      this.color = '#000';
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

  generatePriceArray(price) {
    for (let i = 0; i < price; i++) {
      this.price += "$";
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

  showReason(e) {
    let popover = this.pop.create(ReasonPopover, {
      reasons: this.restaurant.reasons
    });
    popover.present({ev: e})
  }

  openRatePage() {
    this.nav.push(RatePage, {
      restaurant: this.restaurant
    });
  }

  openYelpPage() {
    if(this.plt.is("ios")) {
      window.open(this.restaurant.url, '_system');
    } else {
      open(this.restaurant.url);
    }
  }

  archive() {
    Tools.Archive(this.restaurant);
    this.isInArchive = Tools.IsInArchive(this.restaurant);
    this.event.publish('fd:archiveChange');
  }

  back() {
    this.cancelScrollListener = true;
    this.nav.pop();
  }
}

@Component({
  selector: 'popover-reason',
  template: `
<ion-content padding>
  <h3>Why?</h3>
  <p>{{reasonText}}</p>
</ion-content>
`
})
export class ReasonPopover {
  reasonText = "";

  constructor(private params: NavParams) {
    const reasons = params.get('reasons');
    if (reasons.initial_survey) this.reasonText =
      `We think you'd like this because you said you liked ${Tools.JoinArrayAsList(reasons.initial_survey, 'and')} in the welcome survey.`;
    else this.reasonText =
      `We are showing you this restaurant to show you something new you might want to try.`;
  }
}
