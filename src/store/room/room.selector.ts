import { createSelector } from "reselect";

import { RootState } from "../store";
import { RoomState } from "./room.reducer";

export const selectRoomReducer = (state: RootState): RoomState => state.room;

export const selectUserRoomList = createSelector(
  selectRoomReducer,
  (room) => room.userRoomList
);
export const selectRoomInfo = createSelector(
  selectRoomReducer,
  (room) => room.roomInfo
);
export const selectRoomLoading = createSelector(
  selectRoomReducer,
  (room) => room.roomLoading
);
