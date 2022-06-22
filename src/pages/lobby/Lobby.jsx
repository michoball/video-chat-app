import { useState, useEffect } from "react";
import RoomForm from "../../components/roomForm/CreateRoomForm";
import JoinRoomForm from "../../components/roomForm/JoinRoomForm";
import { LobbyContainer, RoomListContainer, AddRoomBtn } from "./Lobby.styles";
import Spinner from "../../UI/spinner/spinner";

import RoomList from "../../components/roomList/RoomList";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { clearUserRoom, getUserRoomStart } from "../../store/room/room.action";
import {
  selectRoomLoading,
  selectUserRoomList,
} from "../../store/room/room.selector";

function Lobby() {
  const dispatch = useDispatch();
  const [toggleRoomForm, setToggleRoomForm] = useState(false);
  const [join, setJoin] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const userRoomList = useSelector(selectUserRoomList);
  const roomLoading = useSelector(selectRoomLoading);

  useEffect(() => {
    if (currentUser) {
      dispatch(clearUserRoom());
      dispatch(getUserRoomStart(currentUser));
    }
  }, []);

  const toggleRoomFormHandelr = () => {
    setToggleRoomForm(!toggleRoomForm);
  };
  const toggleJoinRoomFormHandelr = () => {
    setJoin(!join);
  };

  console.log(userRoomList);

  return (
    <>
      <LobbyContainer>
        <h2>where are you want to go ?</h2>
        <RoomListContainer>
          {roomLoading ? (
            <Spinner />
          ) : (
            userRoomList.length > 0 &&
            userRoomList.map((userRoom) => {
              return (
                <RoomList key={userRoom.id} id={userRoom.id} room={userRoom} />
              );
            })
          )}
        </RoomListContainer>
        <div className="roomBtn" style={{ display: "flex", gap: "30px" }}>
          <AddRoomBtn className="join" onClick={toggleJoinRoomFormHandelr}>
            Join
          </AddRoomBtn>
          <AddRoomBtn onClick={toggleRoomFormHandelr}>Create</AddRoomBtn>
        </div>
      </LobbyContainer>
      {toggleRoomForm && <RoomForm onToggleForm={toggleRoomFormHandelr} />}
      {join && <JoinRoomForm onToggleForm={toggleJoinRoomFormHandelr} />}
    </>
  );
}

export default Lobby;
