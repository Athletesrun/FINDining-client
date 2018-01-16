import { Restaurant } from '../models/restaurant.model';

export default class Tools {
  static Archive(restaurant) {
    this._initializeArchive();
    let currentArchive = JSON.parse(sessionStorage.getItem('archive'));
    if (!this.IsInArchive(restaurant)) {
      currentArchive.archivedRestaurants.unshift(restaurant);
      sessionStorage.setItem('archive', JSON.stringify(currentArchive));
    }
    else {
      const index = this.GetRestaurantIndex(restaurant, currentArchive.archivedRestaurants);
      currentArchive.archivedRestaurants.splice(index, 1);
      sessionStorage.setItem('archive', JSON.stringify(currentArchive));
    }
  }

  static _initializeArchive() {
    const rawSS = sessionStorage.getItem('archive');
    let currentArchive;
    if (!rawSS) {
      currentArchive = {
        archivedRestaurants: []
      };
      return;
    }
    currentArchive = JSON.parse(rawSS);
    if (!currentArchive) {
      currentArchive = {
        archivedRestaurants: []
      };
      return;
    }
    return;
  }

  static IsInArchive(restaurant) {
    this._initializeArchive();
    let currentArchive = JSON.parse(sessionStorage.getItem('archive'));
    if (!currentArchive) {
      return false;
    }
    return this.ContainsRestaurant(restaurant, currentArchive.archivedRestaurants);
  }

  static ContainsRestaurant(obj: Restaurant, list: Restaurant[]) {
    for (let x in list) {
      if (list.hasOwnProperty(x) && list[x].name === obj.name) {
        return true;
      }
    }
    return false;
  }

  static GetRestaurantIndex(obj: Restaurant, list: Restaurant[]) {
    for (let x in list) {
      if (list.hasOwnProperty(x) && list[x].name === obj.name) {
        return x;
      }
    }
    return -1;
  }
}