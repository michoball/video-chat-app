import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { db } from "./firebase.config";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export type AddInfo = {
  displayName?: string;
};

export type UserData = {
  id: string;
  timestamp: Date;
  displayName: string;
  email: string;
};
// 유저 로그인 시 users collection에 생성하기
// 기존 유저일 시 스킵
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfo = {} as AddInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const timestamp = serverTimestamp();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        timestamp,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Something wrong in creating user Doc", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const GoogleSignUpWithPopUp = async () => {
  return await signInWithPopup(auth, provider);
};

// 유저 생성
export const createUserAuthWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// 유저 로그인
export const signInAuthWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// 유저 로그아웃
export const signOutUser = async () => await signOut(auth);

// export const onAuthStateChangedListener = (callback) =>
//   onAuthStateChanged(auth, callback);

// 유저 상태변화 관찰( 로그인, 아웃시)
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        localStorage.setItem("user", JSON.stringify(userAuth));
        resolve(userAuth);
      },
      reject
    );
  });
};
