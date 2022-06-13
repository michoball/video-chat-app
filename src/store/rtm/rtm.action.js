import { RTM_ACTION_TYPE } from "./rtm.type";
import { createAction } from "../../utill/reducer/reducer.config";

export const addMessages = (messageData) => {
  return createAction(RTM_ACTION_TYPE.ADD_NEW_MESSAGE, messageData);
};

export const setChannel = (channelInfo) => {
  return createAction(RTM_ACTION_TYPE.SET_CHANNEL, channelInfo);
};

export const setRtmClient = (rtmClientInfo) => {
  return createAction(RTM_ACTION_TYPE.SET_RTM_CLIENT, rtmClientInfo);
};

// export const addRtmUser = (userId, name) => {
//   createAction(RTM_ACTION_TYPE.ADD_RTM_USER, { userId, name }));
// };

export const clearMessages = () => {
  return createAction(RTM_ACTION_TYPE.CLEAR_MESSAGE);
};

export const clearClientAndChannel = () => {
  return createAction(RTM_ACTION_TYPE.CLEAR_CLIENT_CHANNEL);
};
