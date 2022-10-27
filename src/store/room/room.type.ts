export enum ROOM_ACTION_TYPE {
  ROOM_ISLOADING = "room/ROOM_ISLOADING",

  CLEAR_USER_ROOM = "room/CLEAR_USER_ROOM",

  UPDATE_USER_ROOMNAME_START = "room/UPDATE_USER_ROOMNAME_START",
  UPDATE_USER_ROOMNAME_FAILED = "room/UPDATE_USER_ROOMNAME_FAILED",

  GET_ROOM_START = "room/GET_ROOM_START",
  GET_ROOM_SUCCESS = "room/GET_ROOM_SUCCESS",
  GET_ROOM_FAILED = "room/GET_ROOM_FAILED",
  DELETE_ROOM_START = "room/DELETE_ROOM_START",
  DELETE_ROOM_SUCCESS = "room/DELETE_ROOM_SUCCESS",
  DELETE_ROOM_FAILED = "room/DELETE_ROOM_FAILED",
  JOIN_ROOM_START = "room/JOIN_ROOM_START",
  JOIN_ROOM_SUCCESS = "room/JOIN_ROOM_SUCCESS",
  JOIN_ROOM_FAILED = "room/JOIN_ROOM_FAILED",
  CREATE_ROOM_START = "room/CREATE_ROOM_START",
  CREATE_ROOM_SUCCESS = "room/CREATE_ROOM_SUCCESS",
  CREATE_ROOM_FAILED = "room/CREATE_ROOM_FAILED",
}

// export type userRoom = {
//   id: string
//   roomName: string
// }