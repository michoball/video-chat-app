import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utill/reducer/reducer.config";
import { LocalUser, RemoteUser, RTC_ACTION_TYPE } from "./rtc.type";
import { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

const toggleUserSize = (
  rtcUserList: RemoteUser[],
  changeUser: IAgoraRTCRemoteUser | IAgoraRTCClient
): RemoteUser[] => {
  const checkRtcUser = rtcUserList?.find(
    (rtcUser) => rtcUser.uid === changeUser.uid
  );
  if (!checkRtcUser) {
    return rtcUserList;
  }
  if (checkRtcUser.size === "base") {
    return rtcUserList?.map((rtcUser) =>
      rtcUser.uid === changeUser.uid
        ? { ...rtcUser, size: "big" }
        : { ...rtcUser, size: "small" }
    );
  }

  if (checkRtcUser.size === "small") {
    return rtcUserList?.map((rtcUser) =>
      rtcUser.uid === changeUser.uid
        ? { ...rtcUser, size: "big" }
        : { ...rtcUser, size: "small" }
    );
  }

  return rtcUserList?.map((rtcUser) => {
    return { ...rtcUser, size: "base" };
  });
  //   if (checkRtcUser.size === "big") {
  // }
};

// --------------------------------------------------------------------//
export type SetLocalUser = ActionWithPayload<
  RTC_ACTION_TYPE.SET_LOCAL_USER,
  LocalUser
>;

export const setLocalUser = withMatcher((user: LocalUser): SetLocalUser => {
  return createAction(RTC_ACTION_TYPE.SET_LOCAL_USER, user);
});

// --------------------------------------------------------------------//
export type ToggleBig = ActionWithPayload<
  RTC_ACTION_TYPE.TOGGLE_RTC_USER,
  RemoteUser[]
>;

export const toggleBig = withMatcher(
  (
    rtcUsers: RemoteUser[],
    user: IAgoraRTCRemoteUser | IAgoraRTCClient
  ): ToggleBig => {
    const newUserList = toggleUserSize(rtcUsers, user);
    return createAction(RTC_ACTION_TYPE.TOGGLE_RTC_USER, newUserList);
  }
);

export type ToggleShare = ActionWithPayload<
  RTC_ACTION_TYPE.TOGGLE_RTC_SHARE,
  { bool: boolean; newRtcUsers: RemoteUser[] }
>;

export const toggleShare = withMatcher(
  (rtcUsers: RemoteUser[], bool: boolean): ToggleShare => {
    const newRtcUsers = bool
      ? rtcUsers?.map((rtcUser) => ({ ...rtcUser, size: "small" }))
      : rtcUsers?.map((rtcUser) => ({ ...rtcUser, size: "base" }));
    return createAction(RTC_ACTION_TYPE.TOGGLE_RTC_SHARE, {
      bool,
      newRtcUsers,
    });
  }
);

// --------------------------------------------------------------------//

export type AddRtcUser = ActionWithPayload<
  RTC_ACTION_TYPE.ADD_RTC_USER,
  IAgoraRTCRemoteUser
>;
export type RemoveRtcUser = ActionWithPayload<
  RTC_ACTION_TYPE.REMOVE_RTC_USER,
  IAgoraRTCRemoteUser
>;

export const addRtcUser = withMatcher(
  (userToAdd: IAgoraRTCRemoteUser): AddRtcUser => {
    return createAction(RTC_ACTION_TYPE.ADD_RTC_USER, userToAdd);
  }
);

export const removeRtcUser = withMatcher(
  (userToRemove: IAgoraRTCRemoteUser): RemoveRtcUser => {
    // const newUserList = removeUserFromList(rtcUserList, userToRemove);
    return createAction(RTC_ACTION_TYPE.REMOVE_RTC_USER, userToRemove);
  }
);

export type ClearRtcUser = Action<RTC_ACTION_TYPE.CLEAR_RTC_USER>;

export const clearRtcUser = withMatcher(
  (): ClearRtcUser => createAction(RTC_ACTION_TYPE.CLEAR_RTC_USER)
);
