import { all, put, call, takeLatest } from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.type";
import { AuthErrorCodes } from "firebase/auth";
import {
  createUserDocumentFromAuth,
  createUserAuthWithEmailAndPassword,
  getCurrentUser,
  GoogleSignUpWithPopUp,
  signInAuthWithEmailAndPassword,
  signOutUser,
} from "../../utill/firebase/firebase.auth";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "./user.action";

// 유저 정보 firebase users collection에 저장
export function* getSnapShotFromUserAuth(userAuth, addInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      addInfo
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// 유저 세션 체크
export function* isAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) {
      return;
    }
    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// 구글 로그인
export function* signInWithGoogle() {
  try {
    const { user } = yield call(GoogleSignUpWithPopUp);
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    if (
      error.message === AuthErrorCodes.INVALID_OAUTH_CLIENT_ID ||
      AuthErrorCodes.INVALID_OAUTH_PROVIDER
    ) {
      alert("Check your Google Account");
    }
    yield put(signInFailed(error));
  }
}

// 이메일 비번 로그인
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    if (
      error.message === AuthErrorCodes.EMAIL_EXISTS ||
      AuthErrorCodes.INVALID_PASSWORD
    ) {
      alert("Check your Email or Password");
    }
    yield put(signInFailed(error));
  }
}

// 회원가입
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createUserAuthWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, displayName));
  } catch (error) {
    if (error.message === AuthErrorCodes.EMAIL_EXISTS) {
      alert("Input Email is already in used");
    }
    yield put(signUpFailed(error));
  }
}

// 회원가입후 로그인
export function* signInAfterSingUp({ payload: { user, displayName } }) {
  yield call(getSnapShotFromUserAuth, user, displayName);
}

// 로그아웃
export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

// --------------------------------------------------------------------//

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSingUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
