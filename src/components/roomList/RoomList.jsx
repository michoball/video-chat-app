import {
  RoomContainer,
  Name,
  DeleteButton,
  RoomsInfo,
  EditButton,
  RoomListLoading,
  SettingContainer,
  EditName,
  RoomNameListContainer,
  ClickSpot,
} from "./RoomList.styles";
import { BiEdit } from "react-icons/bi";
import { BsCheck2Square } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import {
  deleteRoomStart,
  getUserRoomStart,
  updateUserRoomNameStart,
} from "../../store/room/room.action";
import { useState } from "react";

function RoomList({ room }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userList, roomName, roomId } = room;

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(roomName);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const deleteRoomHandler = () => {
    dispatch(deleteRoomStart(roomId, currentUser));
  };

  const editRoomHandler = () => {
    setEditing(!editing);
  };

  const nameChangeHandler = (e) => {
    const name = e.target.value;
    setNewName(name);
  };

  const changeNameHandler = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      dispatch(updateUserRoomNameStart(roomId, newName));
      setLoading(false);
      alert("Room name is changed !");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    editRoomHandler();
  };

  return (
    <RoomContainer>
      <ClickSpot
        onClick={() => {
          navigate(`/room/${roomId}`);
        }}
      />

      <Name onSubmit={changeNameHandler}>
        {loading ? (
          <RoomListLoading />
        ) : (
          <EditName
            className={editing ? "edit" : ""}
            type="text"
            id="roomName"
            value={newName}
            disabled={!editing}
            onChange={nameChangeHandler}
          />
        )}
      </Name>
      <SettingContainer>
        <EditButton>
          {editing ? (
            <BsCheck2Square
              style={{ fill: "#0ABF04" }}
              onClick={changeNameHandler}
            />
          ) : (
            <BiEdit onClick={editRoomHandler} />
          )}
        </EditButton>
        <DeleteButton onClick={deleteRoomHandler}>
          <IoClose />
        </DeleteButton>
      </SettingContainer>

      <RoomsInfo>
        <div className="userTotal">
          <MdPeople style={{ fontSize: "20px" }} /> {userList.length}
        </div>
        <RoomNameListContainer>
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
        </RoomNameListContainer>
      </RoomsInfo>
    </RoomContainer>
  );
}

export default RoomList;
