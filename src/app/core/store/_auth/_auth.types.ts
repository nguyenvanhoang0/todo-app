
export type ActionProps<P, S = {}> = {
  payload: P,
  ignoreStorageKeys?: (keyof S)[]
}


export type AuthState = {
  access_token?: string,
  userInfo?: IUserInfo
}

export interface IUserInfo {
  id: string,
  email: string,
  username: string,
  avatar: string,
}

export interface ILoginPayload {
  email: string,
  password: string
}

export interface ILoginResponse {
  access_token: string,
}

export interface IUserInfoResponse {
  id: string,
  email: string,
  username: string,
  avatar: string,
}


