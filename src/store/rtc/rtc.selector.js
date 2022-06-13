import { createSelector } from "reselect";

const selectRtcReducer = (state) => state.rtc;

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

export const selectRtcNotBig = createSelector([selectRtcUsers], (rtcUsers) => {
  return rtcUsers.filter((rtcUser) => rtcUser.size !== "big");
});
