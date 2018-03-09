type CategoryValues = {
  alias: string,
  title: string
}

export type Restaurant = {
  yelp_id: string,
  name: string,
  url: string,
  image_url: string,
  rating: number,
  price: number,
  distance: number, //  change to "distance"
  // hours: object, //remove
  categories: {
    values: CategoryValues[]
  },
  address: {
    address1: string,
    address2: string,
    address3: string,
    zip_code: string,
    city: string,
    country: string,
    state: string,
    display_address: string[]
  },
  latitude: number,
  longitude: number,
  reviews?: object[],
  display_phone: string,
  phone: string,
  score: number,
  review_count: number
}
