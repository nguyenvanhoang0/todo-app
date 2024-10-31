import { EUserRole } from "../../enums/user.enums"

export type ActionProps<P, S = {}> = {
  payload: P,
  ignoreStorageKeys?: (keyof S)[]
}


export type AuthState = {
  token?: string,
  expires?: Date,
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
  token: string,
  expires: Date
}

export interface IUserInfoResponse {
  id: string,
  email: string,
  username: string,
}


