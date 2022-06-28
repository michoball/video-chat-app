import {
  RoomInfoContainer,
  RoomNameHeader,
  RoomUserList,
  RoomSettings,
  CopyIcon,
  RoomIdCopy,
} from "./RoomInfo.styles";
import { BsCheckLg } from "react-icons/bs";
import Setting from "../setting/Setting";
import { useParams } from "react-router-dom";
import { useState } from "react";

const RoomInfo = ({ roomInfo }) => {
  const { roomId } = useParams();
  const [linkCopyed, setLinkCopyed] = useState(false);

  const copyRoomIdHandler = () => {
    navigator.clipboard.writeText(`Inviting User's Room ID : ${roomId}`);
    setLinkCopyed(true);
    setTimeout(() => {
      setLinkCopyed(false);
    }, 2000);
  };

  return (
    <>
      <RoomInfoContainer>
        {linkCopyed && (
          <RoomIdCopy>
            <BsCheckLg />
            <span>Copyed !</span>
          </RoomIdCopy>
        )}
        <RoomNameHeader>
          {roomInfo.roomName}
          <CopyIcon onClick={copyRoomIdHandler} />
        </RoomNameHeader>
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
    </>
  );
};

export default RoomInfo;
