import {
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpStart,
  toggleSignForm,
} from "./user.action";
import { AnyAction } from "@reduxjs/toolkit";
import { UserDataNId } from "./user.type";

export type UserState = {
  readonly currentUser: UserDataNId | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly isSignUpForm: boolean;
};

const INIT_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
  isSignUpForm: false,
};

export const userReducer = (
  state = INIT_STATE,
  action = {} as AnyAction
): UserState => {
  if (toggleSignForm.match(action)) {
    return {
      ...state,
      isSignUpForm: !state.isSignUpForm,
    };
  }
  if (signInSuccess.match(action)) {
    localStorage.setItem("user", JSON.stringify(action.payload));
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
    };
  }

  if (signOutSuccess.match(action)) {
    localStorage.removeItem("user");
    localStorage.removeItem("Theme-color");
    return {
      ...state,
      currentUser: null,
    };
  }
  if (
    googleSignInStart.match(action) ||
    emailSignInStart.match(action) ||
    signUpStart.match(action)
  ) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (
    signInFailed.match(action) ||
    signOutFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }
  return state;
};

export default userReducer;

// 레거시 코드
// const { type, payload } = action;

// switch (type) {
// case USER_ACTION_TYPE.TOGGLE_SIGN_FORM:
//   return {
//     ...state,
//     isSignUpForm: !state.isSignUpForm,
//   };
// case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
//   localStorage.setItem("user", JSON.stringify(payload));
//   return {
//     ...state,
//     currentUser: payload,
//     isLoading: false,
//   };
// case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
//   localStorage.removeItem("user");
//   localStorage.removeItem("Theme-color");
//   return {
//     ...state,
//     currentUser: null,
//   };
// case USER_ACTION_TYPE.GOOGLE_SIGN_IN_START:
// case USER_ACTION_TYPE.EMAIL_SIGN_IN_START:
// case USER_ACTION_TYPE.SIGN_UP_START:
//   return {
//     ...state,
//     isLoading: true,
//   };
//   case USER_ACTION_TYPE.SIGN_IN_FAILED:
//   case USER_ACTION_TYPE.SIGN_OUT_FAILED:
//   case USER_ACTION_TYPE.SIGN_UP_FAILED:
//     return {
//       ...state,
//       error: payload,
//       isLoading: false,
//     };

//   default:
//     return state;
// }
