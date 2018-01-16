import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: "filter.html",
  providers: [],
  selector: "filter-popover"
})
export class FilterPopover {

  private price: number = 2;
  private distance: number = 10;
  private meal: string = "dinner";

  constructor(
    private view: ViewController
  ) {

  }

  dismissView() {
    this.view.dismiss();
  }
}
