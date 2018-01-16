import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantPage } from '../restaurant/restaurant';

@Component({
  templateUrl: 'archive.html',
  selector: 'page-archive'
})
export class ArchivePage {

  archive: Restaurant[];
  isAnArchive = true;

  constructor(private nav: NavController) {
    const sessionArchive = sessionStorage.getItem('archive');
    if (sessionArchive) {
      this.archive = JSON.parse(sessionArchive).archivedRestaurants;
    }
    else {
      this.archive = [];
      this.isAnArchive = false;
    }
  }

  openDetailsPage(rest) {
    this.nav.push(RestaurantPage, {
      rest: rest
    })
  }

}
