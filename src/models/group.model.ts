import { Restaurant } from "./restaurant.model";

export type Group = {
  id: number,
  people: string[],
  restaurants: Restaurant[]
}