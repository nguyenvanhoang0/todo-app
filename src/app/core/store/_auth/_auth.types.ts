
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionProps<P, S = Record<string, any>> = {
  payload: P,
  ignoreStorageKeys?: (keyof S)[]
}


export type AuthState = {
  access_token?: string,
  userInfo?: IUserInfo
}

export type IUserInfo = {
  id: string,
  email: string,
  username: string,
  avatar: string,
}

export type ILoginPayload = {
  email: string,
  password: string
}

export type ILoginResponse = {
  access_token: string,
}

export type IUserInfoResponse = {
  id: string,
  email: string,
  username: string,
  avatar: string,
}


