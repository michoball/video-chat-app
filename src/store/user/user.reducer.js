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
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
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
    default:
      return state;
  }
};

export default userReducer;
