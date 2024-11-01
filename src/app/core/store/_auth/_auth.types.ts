import { EUserRole } from "../../enums/user.enums"

export type ActionProps<P, S = {}> = {
  payload: P,
  ignoreStorageKeys?: (keyof S)[]
}


export type AuthState = {
  access_token?: string,
  // expires?: Date,
  userInfo?: IUserInfo
}

export interface IUserInfo {
  email: string,
  id: string,
  username: string
}

export interface ILoginPayload {
  email: string,
  password: string
}

export interface ILoginResponse {
  access_token: string,
  // expires: Date
}

export interface IUserInfoResponse {
  id: string,
  email: string,
  username: string,
}


