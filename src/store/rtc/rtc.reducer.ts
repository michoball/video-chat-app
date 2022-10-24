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
  readonly localUser: LocalUser;
  readonly share: Boolean;
};

const RTC_INIT_STATE: RTCUsersState = {
  rtcUsers: [],
  localUser: { user: null, tracks: null },
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
          ? { ...action.payload, size: rtcUser.size }
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
        ? state.rtcUsers.concat({ ...action.payload, size: "small" })
        : state.rtcUsers.concat({ ...action.payload, size: "base" }),
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
      localUser: { user: null, tracks: null },
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

//레거시 코드
// const { type, payload } = action;

//  switch (type) {
//   case RTC_ACTION_TYPE.ADD_RTC_USER:
//     const existingUser = state.rtcUsers.find(
//       (rtcUser) => rtcUser.uid === payload.uid
//     );
//     const BigUser = state.rtcUsers.find((rtcUser) => rtcUser.size === "big");

//     if (existingUser) {
//       const setRtcUsers = state.rtcUsers.map((rtcUser) =>
//         rtcUser.uid === payload.uid
//           ? { ...payload, size: rtcUser.size }
//           : rtcUser
//       );
//       return {
//         ...state,
//         rtcUsers: setRtcUsers,
//       };
//     }

//     return {
//       ...state,
//       rtcUsers: BigUser
//         ? state.rtcUsers.concat({ ...payload, size: "small" })
//         : state.rtcUsers.concat({ ...payload, size: "base" }),
//     };

//   case RTC_ACTION_TYPE.REMOVE_RTC_USER:
//     const romvedRtcUser = state.rtcUsers.filter(
//       (rtcUser) => rtcUser.uid !== payload.uid
//     );
//     return {
//       ...state,
//       rtcUsers: romvedRtcUser,
//     };
//   case RTC_ACTION_TYPE.SET_RTC_USER:
//     return {
//       ...state,
//       rtcUsers: payload,
//     };
//   case RTC_ACTION_TYPE.SET_LOCAL_USER:
//     return {
//       ...state,
//       localUser: payload,
//     };

//   case RTC_ACTION_TYPE.CLEAR_RTC_USER:
//     return {
//       ...state,
//       rtcUsers: [],
//       localUser: null,
//     };

//   case RTC_ACTION_TYPE.TOGGLE_RTC_SHARE:
//     return {
//       ...state,
//       share: payload.bool,
//       rtcUsers: payload.newRtcUsers,
//     };

//   default:
//     return state;
// }
