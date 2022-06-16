import { call, all } from "redux-saga/effects";
import { roomSagas } from "./room/room.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {
  yield all([call(userSagas), call(roomSagas)]);
}
