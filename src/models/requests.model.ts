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
  meal?: string,
  latitude: number,
  longitude: number
}

export type GetRestaurantParams = {
  name: string
}

export type SurveyResultsParams = {
  categories: string[]
}

export type ReviewRestaurantParams = {
  restaurantId: string,
  rating: number
}

export type SearchUserParams = {
  name: string
}

export type GenericUserQueryParams = {
  userId: number
}

export type CreateGroupParams = {
  name: string
}

export type EditGroupParams = {
  member: number,
  groupId: number
}

export type GetGroupRecommendations = GetRestaurantFeedParams & {
  groupId: number
}
