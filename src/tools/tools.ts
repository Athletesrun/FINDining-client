import { Restaurant } from '../models/restaurant.model';

export default class Tools {
  static Archive(restaurant) {
    let currentArchive = this._initializeArchive();
    // JSON.parse(sessionStorage.getItem('archive'));
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
    }
    currentArchive = JSON.parse(rawSS);
    if (!currentArchive) {
      currentArchive = {
        archivedRestaurants: []
      };
    }
    return currentArchive;
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
      if (list.hasOwnProperty(x) && list[x].name === (obj.name || obj)) {
        return x;
      }
    }
    return -1;
  }

  static JoinArrayAsList(arr, conjunction) {
    if (arr.length == 1) return arr.join("");
    const newArr = arr.map(d => d);
    const lastElement = newArr.pop();
    const list = newArr.join(", ");
    return `${list}${arr.length > 2 ? ',' : ''} ${conjunction} ${lastElement}`
  }
}
