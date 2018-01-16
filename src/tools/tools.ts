export default class Tools {
  static Archive(restaurant) {
    let currentArchive = JSON.parse(sessionStorage.getItem('archive'));
    if (!currentArchive) {
      currentArchive = {
        archivedRestaurants: []
      };
    }
    currentArchive.archivedRestaurants.unshift(restaurant);
    sessionStorage.setItem('archive', JSON.stringify(currentArchive));
  }
}