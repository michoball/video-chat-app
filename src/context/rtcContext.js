import { createContext, useEffect, useReducer } from "react";
import { useClient } from "../utill/Agora.config";
import { createAction } from "../utill/reducer/reducer.config";

// const addUserItem = (userlists, user) => {
//   console.log("기본 rtcUser", userlists);
//   console.log("들어온  rtcUser", user);
//   return [...userlists, { ...user }];
// };

// const removeUserItem = (userlists, user) => {
//   return userlists.filter((userlist) => userlist.id !== user.id);
// };

export const RtcContext = createContext({
  rtcUsers: [],
  start: false,
  share: false,
  addRtcUser: (user) => null,
  removeRtcUser: (user) => null,
  toggleStart: (bool) => null,
  toggleShare: (bool) => null,
});

const INIT_STATE = {
  rtcUsers: [],
  start: false,
  share: false,
};

// rtcUser: {
//   uid: null,
//   user: null,
// },

export const USER_ACTION_TYPE = {
  ADD_RTC_USER: "ADD_RTC_USER",
  REMOVE_RTC_USER: "REMOVE_RTC_USER",
  CLEAR_RTC_USER: "CLEAR_RTC_USER",
  SET_RTC_START: "SET_RTC_START",
  SET_RTC_SHARE: "SET_RTC_SHARE",
};

const rtcReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.ADD_RTC_USER:
      return {
        ...state,
        rtcUsers: state.rtcUsers.concat(payload),
      };
    case USER_ACTION_TYPE.REMOVE_RTC_USER:
      return {
        ...state,
        rtcUsers: state.rtcUsers.filter((user) => user.uid !== payload.uid),
        // rtcUsers: state.rtcUser.filter((user) => user.uid !== payload.uid),
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

export const RtcProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rtcReducer, INIT_STATE);
  const { start, rtcUsers, share } = state;
  console.log("rtcUsers : ", rtcUsers);

  const addRtcUser = (user) => {
    const newUser = {
      uid: user.user.uid,
      user: user,
      videoTrack: user.videoTrack,
    };
    dispatch(createAction(USER_ACTION_TYPE.ADD_RTC_USER, newUser));
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

  const value = {
    rtcUsers,
    start,
    share,
    addRtcUser,
    removeRtcUser,
    clearRtcUser,
    toggleStart,
    toggleShare,
  };

  useEffect(() => {}, []);

  return <RtcContext.Provider value={value}>{children}</RtcContext.Provider>;
};
