import {
  RoomContainer,
  Name,
  DeleteButton,
  RoomsInfo,
  RoomListLoading,
} from "./RoomList.styles";
import { MdPeople } from "react-icons/md";
import { Link } from "react-router-dom";
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
            <div className="userName">
              <ul>
                {userList
                  .filter((_, idx) => idx < 3)
                  .map((user) => {
                    return (
                      <li key={user.id}>
                        {user.displayName.length > 7
                          ? user.displayName.slice(0, 7)
                          : user.displayName}
                      </li>
                    );
                  })}
                {userList.length > 3 ? "..." : ""}
              </ul>
            </div>
          </RoomsInfo>
        </>
      )}
    </RoomContainer>
  );
}

export default RoomList;
