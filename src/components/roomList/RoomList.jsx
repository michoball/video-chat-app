import {
  RoomContainer,
  Name,
  DeleteButton,
  RoomsInfo,
  EditButton,
  RoomListLoading,
  SettingContainer,
} from "./RoomList.styles";
import { BiEdit } from "react-icons/bi";
import { MdPeople } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectRoomLoading } from "../../store/room/room.selector";
import { deleteRoomStart } from "../../store/room/room.action";

function RoomList({ id, room }) {
  const dispatch = useDispatch();
  const { userList, roomName } = room;
  const currentUser = useSelector(selectCurrentUser);
  const roomLoading = useSelector(selectRoomLoading);

  const deleteRoomHandler = () => {
    dispatch(deleteRoomStart(id, currentUser));
  };

  return (
    <RoomContainer>
      {roomLoading ? (
        <>
          <RoomListLoading />
        </>
      ) : (
        <>
          <Name>
            <Link to={`/room/${id}`}>{roomName}</Link>
          </Name>
          <SettingContainer>
            <EditButton>
              <BiEdit />
            </EditButton>
            <DeleteButton onClick={deleteRoomHandler}>
              <IoClose />
            </DeleteButton>
          </SettingContainer>

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
