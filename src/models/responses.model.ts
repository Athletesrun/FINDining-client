import { Restaurant } from "./restaurant.model";

export type GetRestaurantsRes = {
  status: number,
  data: Restaurant[];
}

export type GenericStatusRes = {
  status: number,
  message?: string
}

export type GenericErrorRes = {
  status: number,
  message?: string,
  invalidFields?: string[]
}
