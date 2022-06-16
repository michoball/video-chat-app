import { createAction } from "../../utill/reducer/reducer.config";
import { USER_ACTION_TYPE } from "./user.type";

export const setIsLoading = (bool) =>
  createAction(USER_ACTION_TYPE.SET_ISLOADING, bool);

export const toggleSignForm = () =>
  createAction(USER_ACTION_TYPE.TOGGLE_SIGN_FORM);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error);

export const signUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPE.SIGN_UP_START, {
    email,
    password,
    displayName,
  });

export const signUpSuccess = (user, additionalInfo) =>
  createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, { user, additionalInfo });

export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(USER_ACTION_TYPE.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, error);
