import {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCRemoteUser,
  UID,
} from "agora-rtc-sdk-ng";

export enum RTC_ACTION_TYPE {
  ADD_RTC_USER = "ADD_RTC_USER",
  REMOVE_RTC_USER = "REMOVE_RTC_USER",
  SET_RTC_USER = "SET_RTC_USER",
  SET_LOCAL_USER = "SET_LOCAL_USER",
  CLEAR_RTC_USER = "CLEAR_RTC_USER",
  TOGGLE_RTC_SHARE = "TOGGLE_RTC_SHARE",
}

export type LocalUser = {
  user: IAgoraRTCClient;
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
};

export type RemoteUser = {
  uid: UID;
  user: IAgoraRTCRemoteUser;
  size: String;
};
