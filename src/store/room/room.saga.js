import { all, put, call, takeLatest } from "redux-saga/effects";
import {
  createRoomDocuments,
  deleteUserRoom,
  findRoomAndAddInfoDocuments,
  getUserRoomArray,
} from "../../utill/firebase/firebase.document";
import {
  createRoomFailed,
  findRoomSuccess,
  deleteRoomFailed,
  findRoomFailed,
  getUserRoomSuccess,
  getUserRoomFailed,
  roomIsLoading,
} from "./room.action";
import { ROOM_ACTION_TYPE } from "./room.type";

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

export function* newRoomCreate({ payload: { roomName, currentUser } }) {
  yield put(roomIsLoading(true));

  try {
    const newRoom = yield call(createRoomDocuments, roomName, currentUser);
    yield put(findRoomSuccess(newRoom));
    yield put(roomIsLoading(false));
  } catch (error) {
    yield put(createRoomFailed(error));
    yield put(roomIsLoading(false));
  }
}

export function* findRoom({ payload: { roomId, currentUser } }) {
  yield put(roomIsLoading(true));

  try {
    const RoomData = yield call(
      findRoomAndAddInfoDocuments,
      roomId,
      currentUser
    );
    yield put(findRoomSuccess(RoomData));
    yield put(roomIsLoading(false));
  } catch (error) {
    yield put(findRoomFailed(error));
    yield put(roomIsLoading(false));
  }
}

// 삭제 성공하면 리스트에서 바로 사라지게하기
export function* deleteRoom({ payload: { roomId, currentUser } }) {
  yield put(roomIsLoading(true));

  try {
    yield call(deleteUserRoom, roomId, currentUser);
    yield call(getRoomList, currentUser);
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
  yield takeLatest(ROOM_ACTION_TYPE.CREATE_ROOM_START, newRoomCreate);
}

export function* onFindRoomStart() {
  yield takeLatest(ROOM_ACTION_TYPE.FIND_ROOM_START, findRoom);
}

export function* onDeleteRoomStart() {
  yield takeLatest(ROOM_ACTION_TYPE.DELETE_ROOM_START, deleteRoom);
}

export function* roomSagas() {
  yield all([
    call(onCreateRoomStart),
    call(onFindRoomStart),
    call(onDeleteRoomStart),
    call(onGetUserRoomList),
  ]);
}
