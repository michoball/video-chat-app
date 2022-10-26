import { useState, useEffect } from "react";
import RoomForm from "../../components/roomForm/CreateRoomForm";
import JoinRoomForm from "../../components/roomForm/JoinRoomForm";
import {
  LobbyContainer,
  RoomListContainer,
  AddRoomBtn,
  RoomBtnContainer,
} from "./Lobby.styles";
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

  // 유저 Room 정보 초기화
  useEffect(() => {
    if (currentUser) {
      dispatch(clearUserRoom());
      dispatch(getUserRoomStart(currentUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const toggleRoomFormHandelr = () => {
    setToggleRoomForm(!toggleRoomForm);
  };
  const toggleJoinRoomFormHandelr = () => {
    setJoin(!join);
  };

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
              return <RoomList key={userRoom.roomId} room={userRoom} />;
            })
          )}
        </RoomListContainer>
        <RoomBtnContainer>
          <AddRoomBtn className="join" onClick={toggleJoinRoomFormHandelr}>
            Join
          </AddRoomBtn>
          <AddRoomBtn onClick={toggleRoomFormHandelr}>Create</AddRoomBtn>
        </RoomBtnContainer>
      </LobbyContainer>
      {toggleRoomForm && <RoomForm onToggleForm={toggleRoomFormHandelr} />}
      {join && <JoinRoomForm onToggleForm={toggleJoinRoomFormHandelr} />}
    </>
  );
}

export default Lobby;
