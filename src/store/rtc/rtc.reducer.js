import { RTC_ACTION_TYPE } from "./rtc.type";

const RTC_INIT_STATE = {
  rtcUsers: [],
  localUser: {},
  share: false,
};

const rtcReducer = (state = RTC_INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case RTC_ACTION_TYPE.ADD_RTC_USER:
      const existingUser = state.rtcUsers.find(
        (rtcUser) => rtcUser.uid === payload.uid
      );
      const BigUser = state.rtcUsers.find((rtcUser) => rtcUser.size === "big");

      if (existingUser) {
        const setRtcUsers = state.rtcUsers.map((rtcUser) =>
          rtcUser.uid === payload.uid
            ? { ...payload, size: rtcUser.size }
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
          ? state.rtcUsers.concat({ ...payload, size: "small" })
          : state.rtcUsers.concat({ ...payload, size: "base" }),
      };

    case RTC_ACTION_TYPE.REMOVE_RTC_USER:
      const romvedRtcUser = state.rtcUsers.filter(
        (rtcUser) => rtcUser.uid !== payload.uid
      );
      return {
        ...state,
        rtcUsers: romvedRtcUser,
      };
    case RTC_ACTION_TYPE.SET_RTC_USER:
      return {
        ...state,
        rtcUsers: payload,
      };
    case RTC_ACTION_TYPE.SET_LOCAL_USER:
      return {
        ...state,
        localUser: payload,
      };

    case RTC_ACTION_TYPE.CLEAR_RTC_USER:
      return {
        ...state,
        rtcUsers: [],
        localUser: {},
      };

    case RTC_ACTION_TYPE.TOGGLE_RTC_SHARE:
      return {
        ...state,
        share: payload.bool,
        rtcUsers: payload.newRtcUsers,
      };

    default:
      return state;
  }
};

export default rtcReducer;
