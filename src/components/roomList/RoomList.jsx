import { RoomContainer, Name, DeleteButton, RoomInfo } from "./RoomList.styles";
import { MdPeople } from "react-icons/md";
import { Link } from "react-router-dom";

function RoomList({ id, room }) {
  console.log("room id :", id);
  const { userList, roomName } = room;
  return (
    <RoomContainer>
      <Name>
        <Link to={`/room/${id}`}>{roomName}</Link>
      </Name>
      <DeleteButton> &#10005;</DeleteButton>
      <RoomInfo>
        <div
          className="userTotal"
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <MdPeople style={{ fontSize: "20px" }} /> {userList.length}
        </div>
        <div className="liveUser"> online user: 2</div>
      </RoomInfo>
    </RoomContainer>
  );
}

export default RoomList;
