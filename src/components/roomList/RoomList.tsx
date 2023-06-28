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
  updateUserRoomNameStart,
} from "../../store/room/room.action";
import { ChangeEvent, useState, FormEvent, FC, MouseEvent } from "react";
import { UserData } from "../../utill/firebase/firebase.auth";
import { RoomData } from "../../utill/firebase/firebase.document";

type RoomListProps = {
  room: RoomData;
};

const RoomList: FC<RoomListProps> = ({ room }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userList, roomName, roomId } = room;

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(roomName);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const deleteRoomHandler = () => {
    if (currentUser) {
      dispatch(deleteRoomStart(roomId, currentUser));
    }
  };

  const editRoomHandler = () => {
    setEditing(!editing);
  };

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewName(name);
  };

  const changeNameHandler = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(updateUserRoomNameStart(roomId, newName));
      alert("Room name is changed !");
    } catch (error) {
      console.log("change room name error", error);
    }
    setLoading(false);
    editRoomHandler();
  };

  return (
    <RoomContainer>
      <ClickSpot
        onClick={(e) => {
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
        {editing ? (
          <EditButton type="submit" onClick={changeNameHandler}>
            <BsCheck2Square />
          </EditButton>
        ) : (
          <EditButton>
            <BiEdit onClick={editRoomHandler} />
          </EditButton>
        )}

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
              .filter((_: UserData, idx: number) => idx < 3)
              .map((user: UserData & { id: string }) => {
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
};

export default RoomList;
