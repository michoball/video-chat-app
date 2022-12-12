import { AnyAction } from "@reduxjs/toolkit";
import { RtmChannel, RtmClient } from "agora-rtm-sdk";
import { Messages } from "./rtm.type";
import { addMessages, setChannel, setRtmClient, clearRtm } from "./rtm.action";

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
    return {
      ...state,
      messages: state.messages.concat({ ...action.payload }),
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
