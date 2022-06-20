import {
  RoomInfoContainer,
  RoomNameHeader,
  RoomUserList,
  RoomSettings,
} from "./RoomInfo.styles";

import Setting from "../setting/Setting";

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
        <Setting />
      </RoomSettings>
    </RoomInfoContainer>
  );
};

export default RoomInfo;
