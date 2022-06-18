import { createSelector } from "reselect";

const selectRtmReducer = (state) => state.rtm;

export const selectRtmClient = createSelector(
  [selectRtmReducer],
  (rtm) => rtm.rtmClient
);

export const selectRtmChannel = createSelector(
  [selectRtmReducer],
  (rtm) => rtm.channel
);

export const selectRtmMessages = createSelector(
  [selectRtmReducer],
  (rtm) => rtm.messages
);

export const selectRtmUsers = createSelector(
  [selectRtmReducer],
  (rtm) => rtm.rtmUsers
);
