import { AnyAction } from "@reduxjs/toolkit";
import { LocalUser, RemoteUser } from "./rtc.type";
import {
  toggleBig,
  toggleShare,
  addRtcUser,
  removeRtcUser,
  clearRtcUser,
  setLocalUser,
} from "./rtc.action";

export type RTCUsersState = {
  readonly rtcUsers: RemoteUser[];
  readonly localUser: LocalUser | null;
  readonly share: boolean;
};

const RTC_INIT_STATE: RTCUsersState = {
  rtcUsers: [],
  localUser: null,
  share: false,
};

const rtcReducer = (
  state = RTC_INIT_STATE,
  action = {} as AnyAction
): RTCUsersState => {
  if (addRtcUser.match(action)) {
    const existingUser = state.rtcUsers.find(
      (rtcUser) => rtcUser.uid === action.payload.uid
    );
    const BigUser = state.rtcUsers.find((rtcUser) => rtcUser.size === "big");

    if (existingUser) {
      const setRtcUsers = state.rtcUsers.map((rtcUser) =>
        rtcUser.uid === action.payload.uid
          ? {
              uid: action.payload.uid,
              user: action.payload,
              size: rtcUser.size,
            }
          : rtcUser
      );
      return {
        ...state,
        rtcUsers: setRtcUsers,
      };
    }

    return {
      ...state,
      rtcUsers: BigUser
        ? state.rtcUsers.concat({
            uid: action.payload.uid,
            user: action.payload,
            size: "small",
          })
        : state.rtcUsers.concat({
            uid: action.payload.uid,
            user: action.payload,
            size: "base",
          }),
    };
  }

  if (removeRtcUser.match(action)) {
    const romvedRtcUser = state.rtcUsers.filter(
      (rtcUser) => rtcUser.uid !== action.payload.uid
    );
    return {
      ...state,
      rtcUsers: romvedRtcUser,
    };
  }
  if (toggleBig.match(action)) {
    return {
      ...state,
      rtcUsers: action.payload,
    };
  }
  if (setLocalUser.match(action)) {
    return {
      ...state,
      localUser: action.payload,
    };
  }
  if (clearRtcUser.match(action)) {
    return {
      ...state,
      rtcUsers: [],
      localUser: null,
    };
  }
  if (toggleShare.match(action)) {
    return {
      ...state,
      share: action.payload.bool,
      rtcUsers: action.payload.newRtcUsers,
    };
  }
  return state;
};

export default rtcReducer;
