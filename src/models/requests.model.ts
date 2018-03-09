export type RegisterParams = {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

export type LoginParams = {
  email: string,
  password: string
}

export type GetRestaurantFeedParams = {
  distance: number,
  price? : 0 | 1 | 2 | 3 | 4,
  meal? : string
}

export type GetRestaurantParams = {
  name: string
}

export type SurveyResultsParams = {
  categories: string[]
}
