import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utill/reducer/reducer.config";

const INIT_STATE = {
  rtcUsers: [],
  localUser: {},
  start: false,
  share: false,
};

export const USER_ACTION_TYPE = {
  ADD_RTC_USER: "ADD_RTC_USER",
  SET_LOCAL_USER: "SET_LOCAL_USER",
  REMOVE_RTC_USER: "REMOVE_RTC_USER",
  CLEAR_RTC_USER: "CLEAR_RTC_USER",
  TOGGLE_RTC_START: "TOGGLE_RTC_START",
  TOGGLE_RTC_SHARE: "TOGGLE_RTC_SHARE",
  TOGGLE_RTC_BIG: "TOGGLE_RTC_BIG",
};

const rtcReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.ADD_RTC_USER:
      const existingUser = state.rtcUsers.find(
        (rtcUser) => rtcUser.user.uid === payload.user.uid
      );
      if (existingUser) {
        const newRtcUsers = state.rtcUsers.map((rtcUser) =>
          rtcUser.user.uid === payload.user.uid ? payload : rtcUser
        );
        return {
          ...state,
          rtcUsers: newRtcUsers,
        };
      }
      return {
        ...state,
        rtcUsers: state.rtcUsers.concat(payload),
      };
    case USER_ACTION_TYPE.SET_LOCAL_USER:
      return {
        ...state,
        localUser: payload,
      };
    case USER_ACTION_TYPE.REMOVE_RTC_USER:
      return {
        ...state,
        rtcUsers: state.rtcUsers.filter(
          (rtcUser) => rtcUser.user.uid !== payload.user.uid
        ),
      };
    case USER_ACTION_TYPE.CLEAR_RTC_USER:
      return {
        ...state,
        rtcUsers: [],
      };
    case USER_ACTION_TYPE.TOGGLE_RTC_START:
      return {
        ...state,
        start: payload,
      };
    case USER_ACTION_TYPE.TOGGLE_RTC_SHARE:
      return {
        ...state,
        share: payload,
      };
    case USER_ACTION_TYPE.TOGGLE_RTC_BIG:
      const checkRtcUser = state.rtcUsers.find(
        (rtcUser) => rtcUser.user.uid === payload.user.uid
      );
      let newRtcUsers = [];
      if (checkRtcUser.size === "base") {
        newRtcUsers = state.rtcUsers.map((rtcUser) =>
          rtcUser.user.uid === payload.user.uid
            ? { ...rtcUser, size: "big" }
            : { ...rtcUser, size: "small" }
        );
      }

      if (checkRtcUser.size === "big") {
        newRtcUsers = state.rtcUsers.map((rtcUser) => {
          return { ...rtcUser, size: "base" };
        });
      }
      if (checkRtcUser.size === "small") {
        newRtcUsers = state.rtcUsers.map((rtcUser) =>
          rtcUser.user.uid === payload.user.uid
            ? { ...rtcUser, size: "big" }
            : { ...rtcUser, size: "small" }
        );
      }
      return {
        ...state,
        rtcUsers: newRtcUsers,
      };

    default:
      return state;
  }
};

export const RtcContext = createContext({
  rtcUsers: [],
  localUser: {},
  start: false,
  share: false,
  addRtcUser: (user) => null,
  removeRtcUser: (user) => null,
  toggleStart: (bool) => null,
  toggleShare: (bool) => null,
  toggleBig: (bool) => null,
  setLocalUser: (user) => null,
});

export const RtcProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rtcReducer, INIT_STATE);
  const { start, rtcUsers, share, localUser } = state;

  console.log("rtcUsers : ", rtcUsers);

  const addRtcUser = (user) => {
    console.log({ ...user, isBig: false });
    dispatch(
      createAction(USER_ACTION_TYPE.ADD_RTC_USER, { user: user, size: "base" })
    );
  };

  const removeRtcUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPE.REMOVE_RTC_USER, user));
  };

  const clearRtcUser = () =>
    dispatch(createAction(USER_ACTION_TYPE.CLEAR_RTC_USER));

  const toggleStart = (bool) => {
    dispatch(createAction(USER_ACTION_TYPE.TOGGLE_RTC_START, bool));
  };
  const toggleShare = (bool) => {
    dispatch(createAction(USER_ACTION_TYPE.TOGGLE_RTC_SHARE, bool));
  };

  const setLocalUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPE.SET_LOCAL_USER, user));
  };

  const toggleBig = (user) => {
    dispatch(createAction(USER_ACTION_TYPE.TOGGLE_RTC_BIG, user));
  };

  const value = {
    rtcUsers,
    localUser,
    start,
    share,
    addRtcUser,
    removeRtcUser,
    clearRtcUser,
    toggleStart,
    toggleShare,
    setLocalUser,
    toggleBig,
  };

  useEffect(() => {}, []);

  return <RtcContext.Provider value={value}>{children}</RtcContext.Provider>;
};
