import { RTM_ACTION_TYPE } from "./rtm.type";
import { createAction } from "../../utill/reducer/reducer.config";

const removeUser = (userList, userToRemoveId) => {
  if (!userList) {
    return [];
  }
  return userList.filter((rtcUser) => rtcUser.uid !== userToRemoveId);
};

// --------------------------------------------------------------------//

export const addMessages = (messageData) => {
  return createAction(RTM_ACTION_TYPE.ADD_NEW_MESSAGE, messageData);
};

// --------------------------------------------------------------------//

export const addRtmUser = (userId, name) => {
  return createAction(RTM_ACTION_TYPE.SET_RTM_USER, { id: userId, name });
};

export const removeRtmUser = (rtmUsers, userId) => {
  const newRtmUserList = removeUser(rtmUsers, userId);
  return createAction(RTM_ACTION_TYPE.SET_RTM_USER, newRtmUserList);
};

// --------------------------------------------------------------------//

export const setChannel = (channelInfo) => {
  return createAction(RTM_ACTION_TYPE.SET_CHANNEL, channelInfo);
};

export const setRtmClient = (rtmClientInfo) => {
  return createAction(RTM_ACTION_TYPE.SET_RTM_CLIENT, rtmClientInfo);
};
// --------------------------------------------------------------------//

export const clearAll = () => {
  return createAction(RTM_ACTION_TYPE.CLEAR_ALL);
};
