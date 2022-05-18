import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utill/firebase/firebase.auth";
import { createAction } from "../utill/reducer/reducer.config";

export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
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
  const { currentUser, IsSignUpForm } = state;

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user));
  };

  const toggleSignForm = () => {
    dispatch(createAction(USER_ACTION_TYPE.TOGGLE_SIGN_FORM, !IsSignUpForm));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        console.log(user);
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    setCurrentUser,
    currentUser,
    toggleSignForm,
    IsSignUpForm,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
