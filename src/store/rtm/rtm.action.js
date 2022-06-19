import { RTM_ACTION_TYPE } from "./rtm.type";
import { createAction } from "../../utill/reducer/reducer.config";

// const addUser = (userList, joinedUserId, name) => {
//   const existingUser = userList?.find((user) => user.id === joinedUserId);

//   if (existingUser) {
//     return userList.map((user) =>
//       user.id === joinedUserId ? { name, ...user } : user
//     );
//   }
//   return [...userList, { id: joinedUserId, name }];
// };

const removeUser = (userList, userToRemoveId) => {
  if (!userList) {
    return [];
  }
  return userList.filter((rtcUser) => rtcUser.uid !== userToRemoveId);
};

export const addMessages = (messageData) => {
  return createAction(RTM_ACTION_TYPE.ADD_NEW_MESSAGE, messageData);
};

export const addRtmUser = (userId, name) => {
  // const newRtmUserList = addUser(rtmUsers, userId, name);
  return createAction(RTM_ACTION_TYPE.SET_RTM_USER, { id: userId, name });
};

export const removeRtmUser = (rtmUsers, userId) => {
  const newRtmUserList = removeUser(rtmUsers, userId);
  return createAction(RTM_ACTION_TYPE.SET_RTM_USER, newRtmUserList);
};

export const clearAll = () => {
  return createAction(RTM_ACTION_TYPE.CLEAR_ALL);
};
export const setChannel = (channelInfo) => {
  return createAction(RTM_ACTION_TYPE.SET_CHANNEL, channelInfo);
};

export const setRtmClient = (rtmClientInfo) => {
  return createAction(RTM_ACTION_TYPE.SET_RTM_CLIENT, rtmClientInfo);
};
