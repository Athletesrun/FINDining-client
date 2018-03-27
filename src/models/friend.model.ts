import { Restaurant } from "./restaurant.model";

export type Friend = {
  "first_name": string,
  "last_name": string,
  "id": number,
  "liked_restaurants": Restaurant[],
  "friends": number[]
}