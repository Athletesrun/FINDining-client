import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantPage } from '../restaurant/restaurant';

@Component({
  templateUrl: 'archive.html',
  selector: 'page-archive'
})
export class ArchivePage {

  archive: Restaurant[];
  isAnArchive = true;

  constructor(private nav: NavController, private event: Events) {
    this.setArchiveFromSessionStorage();
    event.subscribe('fd:archiveChange', () => {
      this.setArchiveFromSessionStorage(); 
    })
  }

  setArchiveFromSessionStorage() {
    const sessionArchive = sessionStorage.getItem('archive');
    if (sessionArchive) {
      const archivedRestaurants = JSON.parse(sessionArchive).archivedRestaurants;
      if (archivedRestaurants.length > 0) this.archive = archivedRestaurants;
      else this.isAnArchive = false;
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
