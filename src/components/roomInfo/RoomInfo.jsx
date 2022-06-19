import {
  RoomInfoContainer,
  RoomNameHeader,
  RoomUserList,
  RoomSettings,
} from "./RoomInfo.styles";
import { AiOutlineSetting } from "react-icons/ai";

const RoomInfo = ({ roomInfo }) => {
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
