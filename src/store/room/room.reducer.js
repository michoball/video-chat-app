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
    // case ROOM_ACTION_TYPE.ROOM_ISLOADING:
    //   return {
    //     ...state,
    //     roomLoading: payload,
    //   };
    case ROOM_ACTION_TYPE.GET_ROOM_SUCCESS:
      return {
        ...state,
        roomLoading: false,
        userRoomList: payload,
      };
    case ROOM_ACTION_TYPE.JOIN_ROOM_SUCCESS:
      return {
        ...state,
        roomLoading: false,
        roomInfo: payload,
      };
    case ROOM_ACTION_TYPE.DELETE_ROOM_SUCCESS:
      const newUserRoomList = state.userRoomList.filter(
        (roomList) => roomList.id !== payload
      );
      return {
        ...state,
        roomLoading: false,
        userRoomList: newUserRoomList,
      };
    case ROOM_ACTION_TYPE.CLEAR_USER_ROOM:
      return {
        ...state,
        roomInfo: null,
        userRoomList: [],
      };
    case ROOM_ACTION_TYPE.GET_ROOM_START:
    case ROOM_ACTION_TYPE.JOIN_ROOM_START:
    case ROOM_ACTION_TYPE.CREATE_ROOM_START:
    case ROOM_ACTION_TYPE.DELETE_ROOM_START:
      return {
        ...state,
        roomLoading: true,
      };
    case ROOM_ACTION_TYPE.GET_ROOM_FAILED:
    case ROOM_ACTION_TYPE.JOIN_ROOM_FAILED:
    case ROOM_ACTION_TYPE.CREATE_ROOM_FAILED:
    case ROOM_ACTION_TYPE.DELETE_ROOM_FAILED:
      return {
        ...state,
        roomLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
