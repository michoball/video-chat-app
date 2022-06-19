import { createAction } from "../../utill/reducer/reducer.config";
import { RTC_ACTION_TYPE } from "./rtc.type";

const addUserList = (rtcUserList, userToAdd) => {
  const existingUser = rtcUserList?.find((user) => user.uid === userToAdd.uid);

  if (existingUser) {
    return rtcUserList.map((user) =>
      user.uid === userToAdd.uid ? { ...userToAdd, size: user.size } : user
    );
  }

  return [...rtcUserList, { userToAdd }];
};

const removeUserFromList = (rtcUserList, userToRemove) => {
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

// 얘들은  saga 쓸법한데~~~
export const setLocalUser = (user) => {
  return createAction(RTC_ACTION_TYPE.SET_LOCAL_USER, { ...user });
};

export const addRtcUser = (userToAdd) => {
  const newUserList = { ...userToAdd, size: "base" };
  // const newUserList = addUserList(rtcUsers, userToAdd);
  return createAction(RTC_ACTION_TYPE.ADD_RTC_USER, newUserList);
};

export const removeRtcUser = (rtcUserList, userToRemove) => {
  const newUserList = removeUserFromList(rtcUserList, userToRemove);
  return createAction(RTC_ACTION_TYPE.SET_RTC_USER, newUserList);
};
