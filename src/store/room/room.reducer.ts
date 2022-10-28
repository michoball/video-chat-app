import { AnyAction } from "@reduxjs/toolkit";
import { RoomData } from "../../utill/firebase/firebase.document";
import {
  clearUserRoom,
  createRoomFailed,
  createRoomStart,
  deleteRoomFailed,
  deleteRoomStart,
  deleteRoomSuccess,
  getUserRoomFailed,
  getUserRoomStart,
  getUserRoomSuccess,
  joinRoomFailed,
  joinRoomStart,
  joinRoomSuccess,
} from "./room.action";

export type RoomState = {
  readonly userRoomList: RoomData[];
  readonly roomInfo: RoomData | null;
  readonly roomLoading: boolean;
  readonly error: Error | null;
};

const ROOM_INIT_STATE: RoomState = {
  userRoomList: [],
  roomInfo: null,
  roomLoading: false,
  error: null,
};

const roomReducer = (
  state = ROOM_INIT_STATE,
  action = {} as AnyAction
): RoomState => {
  if (getUserRoomSuccess.match(action)) {
    return {
      ...state,
      roomLoading: false,
      userRoomList: action.payload,
    };
  }
  if (joinRoomSuccess.match(action)) {
    return {
      ...state,
      roomLoading: false,
      roomInfo: action.payload,
    };
  }
  if (deleteRoomSuccess.match(action)) {
    const newUserRoomList = state.userRoomList.filter(
      (roomList) => roomList.roomId !== action.payload
    );
    return {
      ...state,
      roomLoading: false,
      userRoomList: newUserRoomList,
    };
  }
  if (clearUserRoom.match(action)) {
    return {
      ...state,
      roomInfo: null,
      userRoomList: [],
    };
  }
  if (
    getUserRoomStart.match(action) ||
    joinRoomStart.match(action) ||
    createRoomStart.match(action) ||
    deleteRoomStart.match(action)
  ) {
    return {
      ...state,
      roomLoading: true,
    };
  }
  if (
    getUserRoomFailed.match(action) ||
    joinRoomFailed.match(action) ||
    createRoomFailed.match(action) ||
    deleteRoomFailed.match(action)
  ) {
    return {
      ...state,
      roomLoading: false,
      error: action.payload,
    };
  }
  return state;
};

export default roomReducer;

//레거시 코드
// const { type, payload } = action;

// switch (type) {
// case ROOM_ACTION_TYPE.GET_ROOM_SUCCESS:
//   return {
//     ...state,
//     roomLoading: false,
//     userRoomList: payload,
//   };
// case ROOM_ACTION_TYPE.JOIN_ROOM_SUCCESS:
//   return {
//     ...state,
//     roomLoading: false,
//     roomInfo: payload,
//   };
// case ROOM_ACTION_TYPE.DELETE_ROOM_SUCCESS:
//   const newUserRoomList = state.userRoomList.filter(
//     (roomList) => roomList.id !== payload
//   );
//   return {
//     ...state,
//     roomLoading: false,
//     userRoomList: newUserRoomList,
//   };
// case ROOM_ACTION_TYPE.CLEAR_USER_ROOM:
//   return {
//     ...state,
//     roomInfo: null,
//     userRoomList: [],
//   };
// case ROOM_ACTION_TYPE.GET_ROOM_START:
//   case ROOM_ACTION_TYPE.JOIN_ROOM_START:
//   case ROOM_ACTION_TYPE.CREATE_ROOM_START:
//   case ROOM_ACTION_TYPE.DELETE_ROOM_START:
//     return {
//       ...state,
//       roomLoading: true,
//     };
//   case ROOM_ACTION_TYPE.GET_ROOM_FAILED:
//   case ROOM_ACTION_TYPE.JOIN_ROOM_FAILED:
//   case ROOM_ACTION_TYPE.CREATE_ROOM_FAILED:
//   case ROOM_ACTION_TYPE.DELETE_ROOM_FAILED:
//     return {
//       ...state,
//       roomLoading: false,
//       error: payload,
//     };
//   default:
//     return state;
// }
