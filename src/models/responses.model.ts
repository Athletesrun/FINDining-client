import { Restaurant } from "./restaurant.model";
import { Group } from "./group.model";
import { Friend } from "./friend.model";

export type LoginRes = {
  status: number,
  data: {
    id: number,
    token: string
  }
}

export type RegisterRes = {
  status: number,
  data: {
    id: number,
    token: string
  }
}

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

export type SearchForFriendRes = {
  status: number,
  data: {
    id: number,
    first_name: string,
    last_name: string,
    alreadyFriend: boolean
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

export type GetGroupsRes = {
  status: number,
  data: Group[]
}

export type CreateGroupRes = {
  status: number,
  data: number
}

export type GetFriendsRes = {
  status: number,
  data: Friend[]
}
