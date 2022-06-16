import {
  RoomInfoContainer,
  RoomNameHeader,
  RoomUserList,
  RoomSettings,
} from "./RoomInfo.styles";

import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectRoomInfo } from "../../store/room/room.selector";

const RoomInfo = () => {
  const roomInfo = useSelector(selectRoomInfo);

  return (
    <RoomInfoContainer>
      <RoomNameHeader>{roomInfo.roomName}</RoomNameHeader>
      <RoomUserList>
        <ul>
          {roomInfo.userList.map((user) => {
            return <li key={user.id}>{user.displayName}</li>;
          })}
        </ul>
      </RoomUserList>
      <RoomSettings>
        <AiOutlineSetting
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log("setting");
          }}
        />
      </RoomSettings>
    </RoomInfoContainer>
  );
};

export default RoomInfo;
