import { User } from "firebase/auth";
import { AddInfo, UserData } from "../../utill/firebase/firebase.auth";
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utill/reducer/reducer.config";
import { USER_ACTION_TYPE } from "./user.type";

export type ToggleSignForm = Action<USER_ACTION_TYPE.TOGGLE_SIGN_FORM>;

// 토글 sign in & up form
export const toggleSignForm = withMatcher(
  (): ToggleSignForm => createAction(USER_ACTION_TYPE.TOGGLE_SIGN_FORM)
);

// --------------------------------------------------------------------//

export type CheckUserSession = Action<USER_ACTION_TYPE.CHECK_USER_SESSION>;

// 유저 세션 체크
export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPE.CHECK_USER_SESSION)
);

// --------------------------------------------------------------------//

export type GoogleSignInStart = Action<USER_ACTION_TYPE.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPE.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_IN_SUCCESS,
  UserData
>;

export type SignInFailed = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_IN_FAILED,
  Error
>;

// 로그인
export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
  (user: UserData): SignInSuccess =>
    createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
  (error: Error): SignInFailed =>
    createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error)
);

// --------------------------------------------------------------------//

export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_UP_START,
  { email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_UP_SUCCESS,
  { user: User; additionalInfo: AddInfo }
>;

export type SignUpFailed = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_UP_FAILED,
  Error
>;

// 회원가입
export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
    createAction(USER_ACTION_TYPE.SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

export const signUpSuccess = withMatcher(
  (user: User, additionalInfo: AddInfo): SignUpSuccess =>
    createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, { user, additionalInfo })
);

export const signUpFailed = withMatcher(
  (error: Error): SignUpFailed =>
    createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, error)
);

// --------------------------------------------------------------------//

export type SignOutStart = Action<USER_ACTION_TYPE.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPE.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_OUT_FAILED,
  Error
>;

// 로그아웃
export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPE.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
  (error: Error): SignOutFailed =>
    createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, error)
);
