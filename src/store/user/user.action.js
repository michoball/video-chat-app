import { createAction } from "../../utill/reducer/reducer.config";
import { USER_ACTION_TYPE } from "./user.type";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);

export const setIsLoading = (bool) =>
  createAction(USER_ACTION_TYPE.SET_ISLOADING, bool);

export const toggleSignForm = () =>
  createAction(USER_ACTION_TYPE.TOGGLE_SIGN_FORM);
