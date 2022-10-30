import { createSelector } from "reselect";
import { RootState } from "../store";
import { RTCUsersState } from "./rtc.reducer";
import { RemoteUser } from "./rtc.type";

const selectRtcReducer = (state: RootState): RTCUsersState => state.rtc;

export const selectRtcLocalUser = createSelector(
  [selectRtcReducer],
  (rtc) => rtc.localUser
);

export const selectRtcUsers = createSelector(
  [selectRtcReducer],
  (rtc) => rtc.rtcUsers
);

export const selectRtcShare = createSelector(
  [selectRtcReducer],
  (rtc) => rtc.share
);

export const selectRtcBig = createSelector([selectRtcUsers], (rtcUsers) => {
  return rtcUsers.find((rtcUser) => rtcUser.size === "big");
});

export const selectRtcBase = createSelector([selectRtcUsers], (rtcUsers) => {
  return rtcUsers.filter((rtcUser) => rtcUser.size === "base");
});

export const selectRtcSmall = createSelector([selectRtcUsers], (rtcUsers) => {
  return rtcUsers.filter((rtcUser) => rtcUser.size === "small");
});
