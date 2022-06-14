import { createAction } from "../../utill/reducer/reducer.config";
import { RTC_ACTION_TYPE } from "./rtc.type";

const addUserToList = (rtcUserList, newUser) => {
  console.log("rtc user list", rtcUserList);
  const existingUser = rtcUserList.find(
    (rtcUser) => rtcUser.uid === newUser.uid
  );
  console.log(" existing user ", existingUser);
  if (existingUser) {
    return rtcUserList.map((rtcUser) =>
      rtcUser.uid === newUser.uid ? { ...newUser, size: rtcUser.size } : rtcUser
    );
  }
  return [...rtcUserList, { ...newUser, size: "base" }];
};

const removeUserFromList = (rtcUserList, userToRemove) => {
  if (!rtcUserList.length) {
    return [];
  }
  return rtcUserList.filter((rtcUser) => rtcUser.uid !== userToRemove.uid);
};

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

export const addRtcUser = (rtcUsers, userToAdd) => {
  const newUserList = addUserToList(rtcUsers, userToAdd);
  return createAction(RTC_ACTION_TYPE.SET_RTC_USER, newUserList);
};

export const removeRtcUser = (rtcUsers, userToRemove) => {
  const newUserList = removeUserFromList(rtcUsers, userToRemove);
  return createAction(RTC_ACTION_TYPE.SET_RTC_USER, newUserList);
};
export const toggleBig = (rtcUsers, user) => {
  const newUserList = toggleUserSize(rtcUsers, user);
  return createAction(RTC_ACTION_TYPE.SET_RTC_USER, newUserList);
};
// export const logOutRtc = async () => {
//   if (localUser) {
//     localUser.tracks[0].close();
//     localUser.tracks[1].close();
//     await localUser.user.leave();
//     localUser.user.removeAllListeners();
//     clearRtcUser();
//   }
// };

export const clearRtcUser = () => createAction(RTC_ACTION_TYPE.CLEAR_RTC_USER);

export const toggleShare = (rtcUsers, bool) => {
  const newRtcUsers = bool
    ? rtcUsers.map((rtcUser) => ({ ...rtcUser, size: "small" }))
    : rtcUsers.map((rtcUser) => ({ ...rtcUser, size: "base" }));
  return createAction(RTC_ACTION_TYPE.TOGGLE_RTC_SHARE, { bool, newRtcUsers });
};

export const setLocalUser = (user) => {
  return createAction(RTC_ACTION_TYPE.SET_LOCAL_USER, { ...user });
};
