import {
  RoomContainer,
  Name,
  DeleteButton,
  RoomsInfo,
  RoomListLoading,
} from "./RoomList.styles";
import { MdPeople } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectRoomIsLoading } from "../../store/room/room.selector";
import { deleteRoomStart } from "../../store/room/room.action";

function RoomList({ id, room }) {
  const dispatch = useDispatch();
  const { userList, roomName } = room;
  const currentUser = useSelector(selectCurrentUser);
  const roomIsLoading = useSelector(selectRoomIsLoading);

  const deleteRoomHandler = () => {
    dispatch(deleteRoomStart(id, currentUser));
  };

  return (
    <RoomContainer>
      {roomIsLoading ? (
        <>
          <RoomListLoading />
        </>
      ) : (
        <>
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
                style={{
                  fontSize: "12px",
                  fill: "#0ABF04",
                  alignItem: "center",
                }}
              />
              2
            </div>
          </RoomsInfo>
        </>
      )}
    </RoomContainer>
  );
}

export default RoomList;
