import { all, put, call, takeLatest } from "redux-saga/effects";
import {
  updateMyRoomToUsersDocuments,
  createRoomDocuments,
  deleteUserRoom,
  joinRoomAndAddInfoDocuments,
  getUserRoomArray,
} from "../../utill/firebase/firebase.document";
import {
  createRoomFailed,
  joinRoomSuccess,
  deleteRoomFailed,
  joinRoomFailed,
  getUserRoomSuccess,
  getUserRoomFailed,
  roomIsLoading,
  deleteRoomSuccess,
  joinRoomStart,
} from "./room.action";
import { ROOM_ACTION_TYPE } from "./room.type";

export function* updateUserRoom(room, user) {
  try {
    const myRoom = yield call(updateMyRoomToUsersDocuments, room.id, user);
    yield put(joinRoomSuccess(myRoom));
    yield put(roomIsLoading(false));
  } catch (error) {
    yield put(joinRoomFailed(error));
    yield put(roomIsLoading(false));
  }
}

export function* getRoomList({ payload: user }) {
  yield put(roomIsLoading(true));
  try {
    const roomList = yield call(getUserRoomArray, user);
    yield put(getUserRoomSuccess(roomList));
    yield put(roomIsLoading(false));
  } catch (error) {
    yield put(getUserRoomFailed(error));
    yield put(roomIsLoading(false));
  }
}

export function* createRoom({ payload: { roomName, currentUser } }) {
  yield put(roomIsLoading(true));

  try {
    const newRoom = yield call(createRoomDocuments, roomName, currentUser);
    yield put(joinRoomStart(newRoom.id, currentUser));
    yield put(roomIsLoading(false));
  } catch (error) {
    yield put(createRoomFailed(error));
    yield put(roomIsLoading(false));
  }
}

// 방에 입장할 때마다 해야함
export function* joinRoom({ payload: { roomId, currentUser } }) {
  yield put(roomIsLoading(true));

  try {
    const roomData = yield call(
      joinRoomAndAddInfoDocuments,
      roomId,
      currentUser
    );
    console.log("ROOM DATA~ ~~~ ", roomData);
    if (roomData) {
      yield call(updateUserRoom, roomData, currentUser);
    }
  } catch (error) {
    yield put(joinRoomFailed(error));
    yield put(roomIsLoading(false));
  }
}

export function* deleteRoom({ payload: { roomId, currentUser } }) {
  yield put(roomIsLoading(true));
  try {
    const deletedRoomId = yield call(deleteUserRoom, roomId, currentUser);
    if (deletedRoomId) {
      yield put(deleteRoomSuccess(deletedRoomId));
    }
    yield put(roomIsLoading(false));
  } catch (error) {
    yield put(deleteRoomFailed(error));
    yield put(roomIsLoading(false));
  }
}

export function* onGetUserRoomList() {
  yield takeLatest(ROOM_ACTION_TYPE.GET_ROOM_START, getRoomList);
}

export function* onCreateRoomStart() {
  yield takeLatest(ROOM_ACTION_TYPE.CREATE_ROOM_START, createRoom);
}

export function* onJoinRoomStart() {
  yield takeLatest(ROOM_ACTION_TYPE.JOIN_ROOM_START, joinRoom);
}

export function* onDeleteRoomStart() {
  yield takeLatest(ROOM_ACTION_TYPE.DELETE_ROOM_START, deleteRoom);
}

export function* roomSagas() {
  yield all([
    call(onCreateRoomStart),
    call(onJoinRoomStart),
    call(onDeleteRoomStart),
    call(onGetUserRoomList),
  ]);
}
