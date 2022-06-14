import {
  RoomContainer,
  Name,
  DeleteButton,
  RoomsInfo,
} from "./RoomList.styles";
import { MdPeople } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { deleteUserRoom } from "../../utill/firebase/firebase.document";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
function RoomList({ id, room }) {
  const { userList, roomName } = room;
  const currentUser = useSelector(selectCurrentUser);

  console.log(userList);

  const deleteRoomHandler = async () => {
    await deleteUserRoom(id, currentUser);
  };

  return (
    <RoomContainer>
      <Name>
        <Link to={`/room/${id}`}>{roomName}</Link>
      </Name>
      <DeleteButton onClick={deleteRoomHandler}> &#10005;</DeleteButton>
      <RoomsInfo>
        <div className="userTotal">
          <MdPeople style={{ fontSize: "20px" }} /> {userList.length}
        </div>
        <div className="liveUser" style={{}}>
          <BsCircleFill
            style={{ fontSize: "12px", fill: "#0ABF04", alignItem: "center" }}
          />
          2
        </div>
      </RoomsInfo>
    </RoomContainer>
  );
}

export default RoomList;
