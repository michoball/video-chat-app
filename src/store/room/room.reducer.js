import { ROOM_ACTION_TYPE } from "./room.type";

const ROOM_INIT_STATE = {
  userRoomList: [],
  roomInfo: null,
  roomLoading: false,
  error: null,
};

const roomReducer = (state = ROOM_INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ROOM_ACTION_TYPE.ROOM_ISLOADING:
      return {
        ...state,
        roomLoading: payload,
      };
    case ROOM_ACTION_TYPE.GET_ROOM_SUCCESS:
      return {
        ...state,
        userRoomList: payload,
      };
    case ROOM_ACTION_TYPE.JOIN_ROOM_SUCCESS:
      return {
        ...state,
        roomInfo: payload,
      };
    case ROOM_ACTION_TYPE.DELETE_ROOM_SUCCESS:
      const newUserRoomList = state.userRoomList.filter(
        (roomList) => roomList.id !== payload
      );
      return {
        ...state,
        userRoomList: newUserRoomList,
      };
    case ROOM_ACTION_TYPE.CLEAR_USER_ROOM:
      return {
        ...state,
        roomInfo: null,
        userRoomList: [],
      };
    case ROOM_ACTION_TYPE.GET_ROOM_FAILED:
    case ROOM_ACTION_TYPE.JOIN_ROOM_FAILED:
    case ROOM_ACTION_TYPE.CREATE_ROOM_FAILED:
    case ROOM_ACTION_TYPE.DELETE_ROOM_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
