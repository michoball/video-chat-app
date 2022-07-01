import { createAction } from "../../utill/reducer/reducer.config";
import { RTC_ACTION_TYPE } from "./rtc.type";

// const removeUserFromList = (rtcUserList, userToRemove) => {
//   return rtcUserList.filter((rtcUser) => rtcUser.uid !== userToRemove.uid);
// };

const toggleUserSize = (rtcUserList, changeUser) => {
  const checkRtcUser = rtcUserList.find(
    (rtcUser) => rtcUser.uid === changeUser.uid
  );

  if (checkRtcUser.size === "base") {
    return rtcUserList.map((rtcUser) =>
      rtcUser.uid === changeUser.uid
        ? { ...rtcUser, size: "big" }
        : { ...rtcUser, size: "small" }
    );
  }
  if (checkRtcUser.size === "big") {
    return rtcUserList.map((rtcUser) => {
      return { ...rtcUser, size: "base" };
    });
  }
  if (checkRtcUser.size === "small") {
    return rtcUserList.map((rtcUser) =>
      rtcUser.uid === changeUser.uid
        ? { ...rtcUser, size: "big" }
        : { ...rtcUser, size: "small" }
    );
  }
};

// --------------------------------------------------------------------//

export const setLocalUser = (user) => {
  return createAction(RTC_ACTION_TYPE.SET_LOCAL_USER, { ...user });
};

// --------------------------------------------------------------------//

export const toggleBig = (rtcUsers, user) => {
  const newUserList = toggleUserSize(rtcUsers, user);
  return createAction(RTC_ACTION_TYPE.SET_RTC_USER, newUserList);
};

export const toggleShare = (rtcUsers, bool) => {
  const newRtcUsers = bool
    ? rtcUsers.map((rtcUser) => ({ ...rtcUser, size: "small" }))
    : rtcUsers.map((rtcUser) => ({ ...rtcUser, size: "base" }));
  return createAction(RTC_ACTION_TYPE.TOGGLE_RTC_SHARE, { bool, newRtcUsers });
};

// --------------------------------------------------------------------//

export const addRtcUser = (userToAdd) => {
  return createAction(RTC_ACTION_TYPE.ADD_RTC_USER, userToAdd);
};

export const removeRtcUser = (userToRemove) => {
  // const newUserList = removeUserFromList(rtcUserList, userToRemove);
  return createAction(RTC_ACTION_TYPE.REMOVE_RTC_USER, userToRemove);
};

export const clearRtcUser = () => createAction(RTC_ACTION_TYPE.CLEAR_RTC_USER);
