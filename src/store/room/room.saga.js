import { all, put, call, takeLatest } from "redux-saga/effects";
import {
  updateMyRoomToUsersDocuments,
  createRoomDocuments,
  deleteUserRoom,
  joinRoomAndAddInfoDocuments,
  getUserRoomArray,
  UpdateUserRoomName,
} from "../../utill/firebase/firebase.document";
import {
  createRoomFailed,
  joinRoomSuccess,
  deleteRoomFailed,
  joinRoomFailed,
  getUserRoomSuccess,
  getUserRoomFailed,
  deleteRoomSuccess,
  joinRoomStart,
  updateUserRoomNameFailed,
} from "./room.action";
import { ROOM_ACTION_TYPE } from "./room.type";

// 방정보 Update
export function* updateUserRoom(room, currentUser) {
  try {
    const myRoom = yield call(
      updateMyRoomToUsersDocuments,
      room.id,
      currentUser
    );
    yield put(joinRoomSuccess(myRoom));
  } catch (error) {
    yield put(joinRoomFailed(error));
  }
}

// user의 myRooms collection에 있는 방들 가져오기
export function* getRoomList({ payload: user }) {
  try {
    const roomList = yield call(getUserRoomArray, user);
    yield put(getUserRoomSuccess(roomList));
  } catch (error) {
    yield put(getUserRoomFailed(error));
  }
}

// 방 생성하기
export function* createRoom({ payload: { roomName, user } }) {
  try {
    const newRoom = yield call(createRoomDocuments, roomName, user);
    yield put(joinRoomStart(newRoom.id, user));
  } catch (error) {
    yield put(createRoomFailed(error));
  }
}

// 기존 rooms collection에 있는 방에 입장
export function* joinRoom({ payload: { roomId, currentUser } }) {
  try {
    const roomData = yield call(
      joinRoomAndAddInfoDocuments,
      roomId,
      currentUser
    );
    console.log(roomData);
    if (roomData) {
      yield call(updateUserRoom, roomData, currentUser);
    }
  } catch (error) {
    console.log(error);
    yield put(joinRoomFailed(error));
  }
}

// 방 삭제, firebase myRooms collection에서도 삭제
export function* deleteRoom({ payload: { roomId, currentUser } }) {
  try {
    const deletedRoomId = yield call(deleteUserRoom, roomId, currentUser);
    if (deletedRoomId) {
      yield put(deleteRoomSuccess(deletedRoomId));
    }
  } catch (error) {
    yield put(deleteRoomFailed(error));
  }
}

// myRooms 에 있는 방 이름만 편집 (rooms에 있는 방 이름은 그대로 )
export function* updateRoomName({ payload: { roomId, newName } }) {
  try {
    yield call(UpdateUserRoomName, roomId, newName);
  } catch (error) {
    yield put(updateUserRoomNameFailed(error));
  }
}

// --------------------------------------------------------------------//

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

export function* onUpdateRoomStart() {
  yield takeLatest(ROOM_ACTION_TYPE.UPDATE_USER_ROOMNAME_START, updateRoomName);
}

export function* roomSagas() {
  yield all([
    call(onCreateRoomStart),
    call(onJoinRoomStart),
    call(onDeleteRoomStart),
    call(onGetUserRoomList),
    call(onUpdateRoomStart),
  ]);
}
