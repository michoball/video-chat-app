import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);
export const selectIsSignUpForm = createSelector(
  selectUserReducer,
  (user) => user.isSignUpForm
);
export const selectIsLoading = createSelector(
  selectUserReducer,
  (user) => user.isLoading
);
