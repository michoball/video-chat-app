import { combineReducers } from "@reduxjs/toolkit";
import rtcReducer from "./rtc/rtc.reducer";
import rtmReducer from "./rtm/rtm.reducer";
import userReducer from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  rtc: rtcReducer,
  rtm: rtmReducer,
});
