import { Restaurant } from "./restaurant.model";

export type GetRestaurantsRes = {
  status: number,
  data: Restaurant[],
  message?: string
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

export type SearchUserRes = {
  status: number,
  data: {
    id: number,
    name: string
  }[]
}

export type GetUserByIdRes = {
  status: number,
  data: {
    id: number,
    name: string,
    friends: number[]
  }[]
}
