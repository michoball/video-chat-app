import { RTM_ACTION_TYPE } from "./rtm.type";
import { createAction } from "../../utill/reducer/reducer.config";

const removeUser = (userList, userToRemoveId) => {
  if (!userList) {
    return [];
  }
  return userList.filter((rtmUser) => rtmUser.uid !== userToRemoveId);
};

const addUser = (userList, userInfo) => {
  if (userList.length < 1) {
    return userInfo;
  }
  return [...userList, userInfo];
};

// --------------------------------------------------------------------//

export const addMessages = (messageData) => {
  return createAction(RTM_ACTION_TYPE.ADD_NEW_MESSAGE, messageData);
};

// --------------------------------------------------------------------//

export const addRtmUser = (rtmUsers, userId, name) => {
  const newUserList = addUser(rtmUsers, { id: userId, name });
  return createAction(RTM_ACTION_TYPE.SET_RTM_USER, newUserList);
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
