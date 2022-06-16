import { ROOM_ACTION_TYPE } from "./room.type";

const ROOM_INIT_STATE = {
  userRoomList: [],
  roomInfo: {},
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
    case ROOM_ACTION_TYPE.FIND_ROOM_SUCCESS:
      return {
        ...state,
        roomInfo: payload,
      };
    case ROOM_ACTION_TYPE.GET_ROOM_FAILED:
    case ROOM_ACTION_TYPE.FIND_ROOM_FAILED:
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
