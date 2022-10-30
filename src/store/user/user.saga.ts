import { all, put, call, takeLatest } from "typed-redux-saga";
import { USER_ACTION_TYPE } from "./user.type";
import { AuthErrorCodes, User } from "firebase/auth";
import {
  createUserDocumentFromAuth,
  createUserAuthWithEmailAndPassword,
  getCurrentUser,
  GoogleSignUpWithPopUp,
  signInAuthWithEmailAndPassword,
  signOutUser,
  AddInfo,
} from "../../utill/firebase/firebase.auth";
import {
  EmailSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  SignUpStart,
  SignUpSuccess,
  signUpSuccess,
} from "./user.action";
import { FirebaseError } from "firebase/app";

// 유저 정보 firebase users collection에 저장
export function* getSnapShotFromUserAuth(userAuth: User, addInfo?: AddInfo) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      addInfo
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

// 유저 세션 체크
export function* isAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) {
      return;
    }
    yield* call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

// 구글 로그인
export function* signInWithGoogle() {
  try {
    const { user } = yield* call(GoogleSignUpWithPopUp);
    yield* call(getSnapShotFromUserAuth, user);
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === AuthErrorCodes.INVALID_OAUTH_CLIENT_ID ||
        error.message === AuthErrorCodes.INVALID_OAUTH_PROVIDER)
    ) {
      alert("Check your Google Account");
    }
    yield* put(signInFailed(error as Error));
  }
}

// 이메일 비번 로그인
export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === AuthErrorCodes.EMAIL_EXISTS ||
        error.message === AuthErrorCodes.INVALID_PASSWORD ||
        error.message)
    ) {
      alert(`Check your Email or Password ${error}`);
    }
    yield* put(signInFailed(error as Error));
  }
}

// 회원가입
export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createUserAuthWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    if (
      error instanceof FirebaseError &&
      (error.code === AuthErrorCodes.EMAIL_EXISTS ||
        error.message === "EMAIL_EXISTS")
    ) {
      alert("Input Email is already in used");
    }
    yield* put(signUpFailed(error as Error));
  }
}

// 회원가입후 로그인
export function* signInAfterSingUp({
  payload: { user, additionalInfo },
}: SignUpSuccess) {
  yield* call(getSnapShotFromUserAuth, user, additionalInfo);
}

// 로그아웃
export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

// --------------------------------------------------------------------//

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isAuthenticated);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSingUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
