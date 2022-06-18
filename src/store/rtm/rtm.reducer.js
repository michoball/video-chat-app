import { RTM_ACTION_TYPE } from "./rtm.type";

// 임의로 만드는 message Uid
const messageUid = () => {
  return Math.floor(Math.random() * 100000 + Math.random() * 10000).toString();
};

const RTM_INIT_STATE = {
  messages: [],
  rtmClient: null,
  rtmUsers: [],
  channel: null,
};

const rtmReducer = (state = RTM_INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case RTM_ACTION_TYPE.ADD_NEW_MESSAGE:
      const messageuid = messageUid();
      return {
        ...state,
        messages: state.messages.concat({ ...payload, id: messageuid }),
      };
    case RTM_ACTION_TYPE.SET_RTM_USER:
      return {
        ...state,
        rtmUsers: payload,
      };
    case RTM_ACTION_TYPE.SET_CHANNEL:
      return {
        ...state,
        channel: payload,
      };
    case RTM_ACTION_TYPE.SET_RTM_CLIENT:
      return {
        ...state,
        rtmClient: payload,
      };
    case RTM_ACTION_TYPE.CLEAR_ALL:
      return {
        ...state,
        rtmClient: null,
        channel: null,
        messages: [],
        rtmUsers: null,
      };
    default:
      return state;
  }
};

export default rtmReducer;
