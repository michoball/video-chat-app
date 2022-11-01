import { Messages, RTM_ACTION_TYPE } from "./rtm.type";
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utill/reducer/reducer.config";
import { RtmChannel, RtmClient } from "agora-rtm-sdk";

// const removeUser = (userList, userToRemoveId) => {
//   if (!userList) {
//     return [];
//   }
//   return userList.filter((rtmUser) => rtmUser.uid !== userToRemoveId);
// };

// const addUser = (userList, userInfo) => {
//   if (userList.length < 1) {
//     return userInfo;
//   }
//   return [...userList, userInfo];
// };

// --------------------------------------------------------------------//

export type AddMessages = ActionWithPayload<
  RTM_ACTION_TYPE.ADD_NEW_MESSAGE,
  Messages
>;

export const addMessages = withMatcher((messageData: Messages): AddMessages => {
  return createAction(RTM_ACTION_TYPE.ADD_NEW_MESSAGE, messageData);
});

// --------------------------------------------------------------------//

// export const addRtmUser = (rtmUsers, userId, name) => {
//   const newUserList = addUser(rtmUsers, { id: userId, name });
//   return createAction(RTM_ACTION_TYPE.SET_RTM_USER, newUserList);
// };

// export const removeRtmUser = (rtmUsers, userId) => {
//   const newRtmUserList = removeUser(rtmUsers, userId);
//   return createAction(RTM_ACTION_TYPE.SET_RTM_USER, newRtmUserList);
// };

// --------------------------------------------------------------------//

export type SetChannel = ActionWithPayload<
  RTM_ACTION_TYPE.SET_CHANNEL,
  RtmChannel
>;

export const setChannel = withMatcher((channelInfo: RtmChannel): SetChannel => {
  return createAction(RTM_ACTION_TYPE.SET_CHANNEL, channelInfo);
});

export type SetRtmClient = ActionWithPayload<
  RTM_ACTION_TYPE.SET_RTM_CLIENT,
  RtmClient
>;

export const setRtmClient = withMatcher(
  (rtmClientInfo: RtmClient): SetRtmClient => {
    return createAction(RTM_ACTION_TYPE.SET_RTM_CLIENT, rtmClientInfo);
  }
);
// --------------------------------------------------------------------//

export type ClearRtm = Action<RTM_ACTION_TYPE.CLEAR_RTM>;

export const clearRtm = withMatcher((): ClearRtm => {
  return createAction(RTM_ACTION_TYPE.CLEAR_RTM);
});
