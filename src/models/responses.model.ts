import { Restaurant } from "./restaurant.model";

export type GetRestaurantsRes = {
  status: number,
  data: Restaurant[];
}
