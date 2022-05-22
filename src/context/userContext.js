import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utill/firebase/firebase.auth";
import { createAction } from "../utill/reducer/reducer.config";

export const UserContext = createContext({
  currentUser: null,
  isLoading: true,
  setCurrentUser: () => null,
  toggleSignForm: () => {},
});

const INIT_STATE = {
  currentUser: null,
  IsSignUpForm: false,
};

export const USER_ACTION_TYPE = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  TOGGLE_SIGN_FORM: "TOGGLE_SIGN_FORM",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPE.TOGGLE_SIGN_FORM:
      return {
        ...state,
        IsSignUpForm: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INIT_STATE);
  const { IsSignUpForm, currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user));
  };

  const toggleSignForm = () => {
    dispatch(createAction(USER_ACTION_TYPE.TOGGLE_SIGN_FORM, !IsSignUpForm));
  };

  const value = {
    currentUser,
    toggleSignForm,
    IsSignUpForm,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      // if (user) {
      //   createUserDocumentFromAuth(user);
      // }
      // setCurrentUser(user);
      let userAuth = null;
      if (user) {
        const userSnapshot = await createUserDocumentFromAuth(user);
        userAuth = { id: userSnapshot.id, ...userSnapshot.data() };
      }
      setCurrentUser(userAuth);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
