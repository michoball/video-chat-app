import { UserData } from "../../utill/firebase/firebase.auth";
import { RoomData } from "../../utill/firebase/firebase.document";
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utill/reducer/reducer.config";
import { ROOM_ACTION_TYPE } from "./room.type";

export type GetUserRoomStart = ActionWithPayload<
  ROOM_ACTION_TYPE.GET_ROOM_START,
  UserData & { id: string }
>;

export type GetUserRoomFailed = ActionWithPayload<
  ROOM_ACTION_TYPE.GET_ROOM_FAILED,
  Error
>;

export type GetUserRoomSuccess = ActionWithPayload<
  ROOM_ACTION_TYPE.GET_ROOM_SUCCESS,
  RoomData[]
>;

export const getUserRoomStart = withMatcher(
  (user: UserData & { id: string }): GetUserRoomStart =>
    createAction(ROOM_ACTION_TYPE.GET_ROOM_START, user)
);

export const getUserRoomFailed = withMatcher(
  (error: Error): GetUserRoomFailed =>
    createAction(ROOM_ACTION_TYPE.GET_ROOM_FAILED, error)
);

export const getUserRoomSuccess = withMatcher(
  (roomList: RoomData[]): GetUserRoomSuccess =>
    createAction(ROOM_ACTION_TYPE.GET_ROOM_SUCCESS, roomList)
);

// --------------------------------------------------------------------//
export type JoinUserRoomStart = ActionWithPayload<
  ROOM_ACTION_TYPE.JOIN_ROOM_START,
  { roomId: string; currentUser: UserData & { id: string } }
>;

export type JoinUserRoomFailed = ActionWithPayload<
  ROOM_ACTION_TYPE.JOIN_ROOM_FAILED,
  Error
>;

export type JoinUserRoomSuccess = ActionWithPayload<
  ROOM_ACTION_TYPE.JOIN_ROOM_SUCCESS,
  RoomData
>;

export const joinRoomStart = withMatcher(
  (roomId: string, currentUser: UserData & { id: string }): JoinUserRoomStart =>
    createAction(ROOM_ACTION_TYPE.JOIN_ROOM_START, { roomId, currentUser })
);

export const joinRoomSuccess = withMatcher(
  (newRoom: RoomData): JoinUserRoomSuccess =>
    createAction(ROOM_ACTION_TYPE.JOIN_ROOM_SUCCESS, newRoom)
);

export const joinRoomFailed = withMatcher(
  (error: Error): JoinUserRoomFailed =>
    createAction(ROOM_ACTION_TYPE.JOIN_ROOM_FAILED, error)
);

// --------------------------------------------------------------------//

export type DeleteUserRoomStart = ActionWithPayload<
  ROOM_ACTION_TYPE.DELETE_ROOM_START,
  { roomId: string; currentUser: UserData & { id: string } }
>;

export type DeleteUserRoomFailed = ActionWithPayload<
  ROOM_ACTION_TYPE.DELETE_ROOM_FAILED,
  Error
>;

export type DeleteUserRoomSuccess = ActionWithPayload<
  ROOM_ACTION_TYPE.DELETE_ROOM_SUCCESS,
  string
>;

export const deleteRoomStart = withMatcher(
  (
    roomId: string,
    currentUser: UserData & { id: string }
  ): DeleteUserRoomStart =>
    createAction(ROOM_ACTION_TYPE.DELETE_ROOM_START, {
      roomId,
      currentUser,
    })
);

export const deleteRoomSuccess = withMatcher(
  (roomId: string): DeleteUserRoomSuccess =>
    createAction(ROOM_ACTION_TYPE.DELETE_ROOM_SUCCESS, roomId)
);

export const deleteRoomFailed = withMatcher(
  (error: Error): DeleteUserRoomFailed =>
    createAction(ROOM_ACTION_TYPE.DELETE_ROOM_FAILED, error)
);

// --------------------------------------------------------------------//

export type CreateUserRoomStart = ActionWithPayload<
  ROOM_ACTION_TYPE.CREATE_ROOM_START,
  { roomName: string; user: UserData & { id: string } }
>;

export type CreateUserRoomFailed = ActionWithPayload<
  ROOM_ACTION_TYPE.CREATE_ROOM_FAILED,
  Error
>;

export const createRoomStart = withMatcher(
  (roomName: string, user: UserData & { id: string }): CreateUserRoomStart =>
    createAction(ROOM_ACTION_TYPE.CREATE_ROOM_START, { roomName, user })
);

export const createRoomFailed = withMatcher(
  (error: Error): CreateUserRoomFailed =>
    createAction(ROOM_ACTION_TYPE.CREATE_ROOM_FAILED, error)
);

// --------------------------------------------------------------------//

export type ClearUserRoom = Action<ROOM_ACTION_TYPE.CLEAR_USER_ROOM>;

export const clearUserRoom = withMatcher(
  (): ClearUserRoom => createAction(ROOM_ACTION_TYPE.CLEAR_USER_ROOM)
);
// --------------------------------------------------------------------//

export type UpdateUserRoomStart = ActionWithPayload<
  ROOM_ACTION_TYPE.UPDATE_USER_ROOMNAME_START,
  { roomId: string; newName: string }
>;

export type UpdateUserRoomFailed = ActionWithPayload<
  ROOM_ACTION_TYPE.UPDATE_USER_ROOMNAME_FAILED,
  Error
>;

export const updateUserRoomNameStart = withMatcher(
  (roomId: string, newName: string): UpdateUserRoomStart =>
    createAction(ROOM_ACTION_TYPE.UPDATE_USER_ROOMNAME_START, {
      roomId,
      newName,
    })
);

export const updateUserRoomNameFailed = withMatcher(
  (error: Error): UpdateUserRoomFailed =>
    createAction(ROOM_ACTION_TYPE.UPDATE_USER_ROOMNAME_FAILED, error)
);
