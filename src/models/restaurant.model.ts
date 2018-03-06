export type Restaurant = {
  id: string,
  name: string,
  url: string,
  img: string,
  rating: number,
  price: number,
  distance: number, //  change to "distance"
  // hours: object, //remove
  category: string[],
  address: string[],
  location: number[],
  reviews?: object[]
}
