import {
  RoomContainer,
  Name,
  DeleteButton,
  RoomsInfo,
  EditButton,
  RoomListLoading,
  SettingContainer,
  EditName,
} from "./RoomList.styles";
import { BiEdit } from "react-icons/bi";
import { BsCheck2Square } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectRoomLoading } from "../../store/room/room.selector";
import { deleteRoomStart } from "../../store/room/room.action";
import { useState } from "react";

import { UpdateUserRoomName } from "../../utill/firebase/firebase.document";

function RoomList({ id, room }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userList, roomName } = room;

  const [editting, setEditting] = useState(false);
  const [newName, setNewName] = useState(roomName);
  const currentUser = useSelector(selectCurrentUser);
  const roomLoading = useSelector(selectRoomLoading);

  const deleteRoomHandler = () => {
    dispatch(deleteRoomStart(id, currentUser));
  };

  const editRoomHandler = () => {
    setEditting(!editting);
  };

  const nameChangeHandler = (e) => {
    const name = e.target.value;
    setNewName(name);
  };

  const changeNameHandler = async (e) => {
    e.preventDefault();
    if (newName === roomName) return;
    try {
      await UpdateUserRoomName(id, newName);
      console.log("done");
    } catch (error) {
      console.log(error);
    }
    editRoomHandler();
  };

  return (
    <RoomContainer>
      <div
        style={{
          width: "300px",
          height: "50px",
          cursor: "pointer",
          marginLeft: "100px",
        }}
        onClick={() => {
          navigate(`/room/${id}`);
        }}
      />
      {roomLoading ? (
        <RoomListLoading />
      ) : (
        <>
          <Name onSubmit={changeNameHandler}>
            <EditName
              className={editting ? "edit" : ""}
              type="text"
              id="roomName"
              value={newName}
              disabled={!editting}
              onChange={nameChangeHandler}
            />
          </Name>
          <SettingContainer>
            <EditButton>
              {editting ? (
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
