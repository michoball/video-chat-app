import { createAction } from "../../utill/reducer/reducer.config";
import { USER_ACTION_TYPE } from "./user.type";

// 토글 sign in & up form
export const toggleSignForm = () =>
  createAction(USER_ACTION_TYPE.TOGGLE_SIGN_FORM);

// --------------------------------------------------------------------//

// 유저 세션 체크
export const checkUserSession = () =>
  createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);

// --------------------------------------------------------------------//

// 로그인
export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error);

// --------------------------------------------------------------------//

// 회원가입
export const signUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPE.SIGN_UP_START, {
    email,
    password,
    displayName,
  });

export const signUpSuccess = (user, displayName) =>
  createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, { user, displayName });

export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, error);

// --------------------------------------------------------------------//

// 로그아웃
export const signOutStart = () => createAction(USER_ACTION_TYPE.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, error);
