import { AnyAction } from "@reduxjs/toolkit";
import { RtmChannel, RtmClient } from "agora-rtm-sdk";
import { Messages } from "./rtm.type";
import { addMessages, setChannel, setRtmClient, clearRtm } from "./rtm.action";

// 임의로 만드는 message Uid
const messageUid = () => {
  return Math.floor(Math.random() * 100000 + Math.random() * 10000).toString();
};

export type RTMUsersState = {
  messages: Messages[];
  rtmClient: RtmClient | null;
  channel: RtmChannel | null;
};

// rtmUsers array 는 잠시 빼둠 --> 유저 이름 태그를 위한 배열이었슴

const RTM_INIT_STATE: RTMUsersState = {
  messages: [],
  rtmClient: null,
  channel: null,
};

const rtmReducer = (
  state = RTM_INIT_STATE,
  action = {} as AnyAction
): RTMUsersState => {
  if (addMessages.match(action)) {
    const messageuid = messageUid();
    return {
      ...state,
      messages: state.messages.concat({ ...action.payload, id: messageuid }),
    };
  }
  if (setChannel.match(action)) {
    return {
      ...state,
      channel: action.payload,
    };
  }
  if (setRtmClient.match(action)) {
    return {
      ...state,
      rtmClient: action.payload,
    };
  }
  if (clearRtm.match(action)) {
    return {
      rtmClient: null,
      channel: null,
      messages: [],
    };
  }
  return state;
};

export default rtmReducer;

//레거시 리듀서 코드
// const { type, payload } = action;

// switch (type) {
//   case RTM_ACTION_TYPE.ADD_NEW_MESSAGE:
//     const messageuid = messageUid();
//     return {
//       ...state,
//       messages: state.messages.concat({ ...payload, id: messageuid }),
//     };
// case RTM_ACTION_TYPE.SET_RTM_USER:
// if (!state.rtmUsers) {
//   return {
//     ...state,
//     rtmUsers: [payload],
//   };
// }
//   return {
//     ...state,
//     rtmUsers: payload,
//   };
// case RTM_ACTION_TYPE.SET_CHANNEL:
//   return {
//     ...state,
//     channel: payload,
//   };
// case RTM_ACTION_TYPE.SET_RTM_CLIENT:
//   return {
//     ...state,
//     rtmClient: payload,
//   };
// case RTM_ACTION_TYPE.CLEAR_RTM:
//   return {
//     ...state,
//     rtmClient: null,
//     channel: null,
//     messages: [],
//   };
// default:
//   return state;
// }
