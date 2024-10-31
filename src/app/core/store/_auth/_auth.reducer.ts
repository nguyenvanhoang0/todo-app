import {createReducer, on} from "@ngrx/store";
import { authActions } from "./_auth.actions";
import { AuthState, IUserInfo } from "./_auth.types";

const initialState: AuthState = {
  token: '',
}

export const authReducer = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, payload) => {
    localStorage.setItem('accessToken', payload.token);
    localStorage.setItem('expires', payload.expires.toString());
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
  })
)
