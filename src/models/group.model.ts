import { Restaurant } from "./restaurant.model";

export type Group = {
  id: number,
  name: string,
  members: number[],
  favorites: Restaurant[],
  upvotes?: any,
  downvotes?: any
}