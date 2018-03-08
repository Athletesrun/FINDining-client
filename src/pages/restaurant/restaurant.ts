import { Component, ViewChild } from "@angular/core";
import { Content, NavController, NavParams, Events } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { Restaurant } from "../../models/restaurant.model";
import Tools from "../../tools/tools";
import Vibrant from 'node-vibrant';
import tinycolor from 'tinycolor2';
import mapboxgl from 'mapbox-gl';

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
    private event: Events
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
      zoom: 17
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

  openYelpPage() {
    open(this.restaurant.url);
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
