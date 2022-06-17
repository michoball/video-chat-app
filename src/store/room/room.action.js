import { createAction } from "../../utill/reducer/reducer.config";
import { ROOM_ACTION_TYPE } from "./room.type";

export const getUserRoomStart = (user) =>
  createAction(ROOM_ACTION_TYPE.GET_ROOM_START, user);

export const getUserRoomFailed = (error) =>
  createAction(ROOM_ACTION_TYPE.GET_ROOM_FAILED, error);

export const getUserRoomSuccess = (roomList) =>
  createAction(ROOM_ACTION_TYPE.GET_ROOM_SUCCESS, roomList);

// --------------------------------------------------------------------//

export const findRoomStart = (roomId, currentUser) =>
  createAction(ROOM_ACTION_TYPE.FIND_ROOM_START, { roomId, currentUser });

export const findRoomSuccess = (newRoom) =>
  createAction(ROOM_ACTION_TYPE.FIND_ROOM_SUCCESS, newRoom);

export const findRoomFailed = (error) => {
  createAction(ROOM_ACTION_TYPE.FIND_ROOM_FAILED, error);
};

// --------------------------------------------------------------------//

export const deleteRoomStart = (roomId, currentUser) =>
  createAction(ROOM_ACTION_TYPE.DELETE_ROOM_START, { roomId, currentUser });

export const deleteRoomSuccess = (roomId) =>
  createAction(ROOM_ACTION_TYPE.DELETE_ROOM_SUCCESS, roomId);

export const deleteRoomFailed = (error) =>
  createAction(ROOM_ACTION_TYPE.DELETE_ROOM_FAILED, error);

// --------------------------------------------------------------------//

export const createRoomStart = (roomName, currentUser) =>
  createAction(ROOM_ACTION_TYPE.CREATE_ROOM_START, { roomName, currentUser });

export const createRoomFailed = (error) => {
  createAction(ROOM_ACTION_TYPE.CREATE_ROOM_FAILED, error);
};
// --------------------------------------------------------------------//

export const roomIsLoading = (bool) =>
  createAction(ROOM_ACTION_TYPE.ROOM_ISLOADING, bool);
