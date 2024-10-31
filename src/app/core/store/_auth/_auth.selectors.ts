import {createSelector} from "@ngrx/store";
import { MainState } from "../_store.types";

const selectAuth = (state: MainState) => state.auth;


export const selectUserInfo = createSelector(
  selectAuth,
  (authState) => authState.userInfo
);
