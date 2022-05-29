import { createContext, useEffect, useReducer, useState } from "react";
import { ScreenTracks, useClient } from "../utill/Agora.config";
import { createAction } from "../utill/reducer/reducer.config";

// const checkUserItem = (userlists, user) => {
//   console.log("기본 rtcUser", userlists);
//   console.log("들어온  rtcUser", user);
//   return [...userlists, { ...user }];
// };

// const removeUserItem = (userlists, user) => {
//   return userlists.filter((userlist) => userlist.id !== user.id);
// };

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
  SET_RTC_START: "SET_RTC_START",
  SET_RTC_SHARE: "SET_RTC_SHARE",
};

const rtcReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.ADD_RTC_USER:
      const existingUser = state.rtcUsers.find(
        (rtcUser) => rtcUser.uid === payload.uid
      );
      if (existingUser) {
        const newRtcUsers = state.rtcUsers.map((rtcUser) =>
          rtcUser.uid === payload.uid ? payload : rtcUser
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
        rtcUsers: state.rtcUsers.filter((user) => user.uid !== payload.uid),
      };
    case USER_ACTION_TYPE.CLEAR_RTC_USER:
      return {
        ...state,
        rtcUsers: [],
      };
    case USER_ACTION_TYPE.SET_RTC_START:
      return {
        ...state,
        start: payload,
      };
    case USER_ACTION_TYPE.SET_RTC_SHARE:
      return {
        ...state,
        share: payload,
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
  setLocalUser: (user) => null,
});

export const RtcProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rtcReducer, INIT_STATE);
  const { start, rtcUsers, share, localUser } = state;

  console.log("rtcUsers : ", rtcUsers);

  const addRtcUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPE.ADD_RTC_USER, user));
  };

  const removeRtcUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPE.REMOVE_RTC_USER, user));
  };

  const clearRtcUser = () =>
    dispatch(createAction(USER_ACTION_TYPE.CLEAR_RTC_USER));

  const toggleStart = (bool) => {
    dispatch(createAction(USER_ACTION_TYPE.SET_RTC_START, bool));
  };
  const toggleShare = (bool) => {
    dispatch(createAction(USER_ACTION_TYPE.SET_RTC_SHARE, bool));
  };

  const setLocalUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPE.SET_LOCAL_USER, user));
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
  };

  useEffect(() => {}, []);

  return <RtcContext.Provider value={value}>{children}</RtcContext.Provider>;
};
