import { useState, useEffect } from "react";
import { getUserRoomArray } from "../../utill/firebase/firebase.document";

import RoomForm from "../../components/roomForm/RoomForm";
import { LobbyContainer, RoomListContainer, AddRoomBtn } from "./Lobby.styles";

import RoomList from "../../components/roomList/RoomList";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";

function Lobby() {
  const [toggleRoomForm, setToggleRoomForm] = useState(false);
  const [userRooms, setUserRooms] = useState([]);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const userRoom = async (user) => {
      const snapShot = await getUserRoomArray(user);
      console.log(snapShot.map((room) => room.data()));
      setUserRooms(snapShot);
    };
    if (currentUser) {
      userRoom(currentUser);
    }
  }, [currentUser]);

  console.log(userRooms);

  const toggleRoomFormHandelr = () => {
    setToggleRoomForm(!toggleRoomForm);
  };

  return (
    <>
      <LobbyContainer>
        <h2>where are you want to go ?</h2>
        <RoomListContainer>
          {userRooms.length > 0 &&
            userRooms.map((userRoom) => {
              return (
                <RoomList
                  key={userRoom.id}
                  id={userRoom.id}
                  room={userRoom.data()}
                />
              );
            })}
        </RoomListContainer>
        <div className="newRoomButton">
          <AddRoomBtn onClick={toggleRoomFormHandelr}>New Room</AddRoomBtn>
        </div>
      </LobbyContainer>
      {toggleRoomForm && <RoomForm onToggleForm={toggleRoomFormHandelr} />}
    </>
  );
}

export default Lobby;

/*
          <RoomContainer>
            <Name>
              <a href="/#">영어 수업 방</a>
            </Name>
            <DeleteButton> &#10005;</DeleteButton>
            <RoomInfo>
              <div className="userTotal"> totalUser : 2</div>
              <div className="liveUser"> userIn : 1</div>
            </RoomInfo>
          </RoomContainer>
          <RoomContainer>
            <Name>
              <a href="/#">대학교 동기 방</a>
            </Name>
            <DeleteButton> &#10005;</DeleteButton>
            <RoomInfo>
              <div className="userTotal"> totalUser : 5</div>
              <div className="liveUser"> userIn : 4</div>
            </RoomInfo>
          </RoomContainer>
          */
