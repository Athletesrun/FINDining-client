import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import {ArchivePage} from "../../archive/archive";
import {GroupsPage} from "../../groups/groups";

@Component({
  templateUrl: 'overflow.html',
  selector: 'popover-overflow'
})
export class OverflowPopover {

  nav;

  constructor(private view: ViewController, private params: NavParams) {
    this.nav = params.get('nav');
  }

  openGroupsPage() {
    this.nav.push(GroupsPage);
    this.close();
  }

  openArchivePage() {
    this.nav.push(ArchivePage);
    this.close();
  }

  close() {
    this.view.dismiss();
  }
}
