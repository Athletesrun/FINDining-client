import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'overflow.html',
  selector: 'popover-overflow'
})
export class OverflowPopover {

  constructor(private view: ViewController) {

  }

  close() {
    this.view.dismiss();
  }

}
