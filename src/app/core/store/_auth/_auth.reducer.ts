import {createReducer, on} from "@ngrx/store";
import { authActions } from "./_auth.actions";
import { AuthState, IUserInfo } from "./_auth.types";

const initialState: AuthState = {
  access_token: '',
}

export const authReducer = createReducer(
  initialState,
  
  on(authActions.loginSuccess, (state, payload) => {        
    localStorage.setItem('accessToken', payload.access_token);
    return {
      ...state,
      ...payload
    }
  }),
  on(authActions.saveUserInfo, (state, payload: IUserInfo) => {
    return {
      ...state,
      userInfo: {
        ...payload
      }
    }
  }),
  on(authActions.logout, (state) => ({
    ...state,
    accessToken: null,
    user: null,
  }))
)
