import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: "filter.html",
  providers: [],
  selector: "filter-popover"
})
export class FilterPopover {

  private price: number = 0;
  private distance: number = 10;
  private meal: string = "unset";

  changeSource;

  constructor(
    private view: ViewController,
    private params: NavParams
  ) {
    this.price = params.get("price");
    this.distance = params.get("distance");
    this.meal = params.get("meal");
    this.changeSource = params.get("onChangeSource");
  }

  onChange() {
    this.changeSource({
      distance: this.distance,
      price: this.price,
      meal: this.meal
    });
    console.log(this.distance, this.price, this.meal);
  }

  dismissView() {
    this.view.dismiss();
  }
}
