import { USER_ACTION_TYPE } from "./user.type";

const INIT_STATE = {
  currentUser: null,
  roomInfo: null,
  isLoading: false,
  error: null,
  IsSignUpForm: false,
};

export const userReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_ISLOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case USER_ACTION_TYPE.TOGGLE_SIGN_FORM:
      return {
        ...state,
        IsSignUpForm: !state.IsSignUpForm,
      };
    case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
      localStorage.removeItem("user");
      localStorage.removeItem("Theme-color");
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPE.SIGN_IN_FAILED:
    case USER_ACTION_TYPE.SIGN_OUT_FAILED:
    case USER_ACTION_TYPE.SIGN_UP_FAILED:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default userReducer;
