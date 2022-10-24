import { USER_ACTION_TYPE } from "./user.type";

const INIT_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
  IsSignUpForm: false,
};

export const userReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
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
        isLoading: false,
      };
    case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
      localStorage.removeItem("user");
      localStorage.removeItem("Theme-color");
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPE.GOOGLE_SIGN_IN_START:
    case USER_ACTION_TYPE.EMAIL_SIGN_IN_START:
    case USER_ACTION_TYPE.SIGN_UP_START:
      return {
        ...state,
        isLoading: true,
      };
    case USER_ACTION_TYPE.SIGN_IN_FAILED:
    case USER_ACTION_TYPE.SIGN_OUT_FAILED:
    case USER_ACTION_TYPE.SIGN_UP_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
