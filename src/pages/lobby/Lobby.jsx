import { useState, useEffect, useContext } from "react";
import { getUserRoomArray } from "../../utill/firebase/firebase.document";
import { UserContext } from "../../context/userContext";

import RoomForm from "../roomForm/RoomForm";
import {
  LobbyContainer,
  RoomListContainer,
  RoomContainer,
  DeleteButton,
  RoomInfo,
  Name,
  AddRoomBtn,
} from "./Lobby.styles";

function Lobby() {
  const [toggleRoomForm, setToggleRoomForm] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const userRoom = async (user) => {
      const snapShot = await getUserRoomArray(user);
      console.log(snapShot.map((room) => room.data()));
    };

    userRoom(currentUser);
  }, []);

  const toggleRoomFormHandelr = () => {
    setToggleRoomForm(!toggleRoomForm);
    console.log("click");
  };

  return (
    <>
      <LobbyContainer>
        <h1>where are you want to go~?</h1>
        <RoomListContainer>
          <RoomContainer>
            <Name>
              <a href="/#">room1</a>
            </Name>
            <DeleteButton> &#10005;</DeleteButton>
            <RoomInfo>
              <div className="userTotal"> total member : 4</div>
              <div className="liveUser"> online user: 2</div>
            </RoomInfo>
          </RoomContainer>
          <RoomContainer>
            <Name>
              <a href="/#">room2</a>
            </Name>
            <DeleteButton>X</DeleteButton>
            <RoomInfo>
              <div className="userTotal"> totalUser : 2</div>
              <div className="liveUser"> userIn : 2</div>
            </RoomInfo>
          </RoomContainer>
          <RoomContainer>
            <Name>
              <a href="/#">room3</a>
            </Name>
            <DeleteButton>X</DeleteButton>
            <RoomInfo>
              <div className="userTotal"> totalUser : 5</div>
              <div className="liveUser"> userIn : 4</div>
            </RoomInfo>
          </RoomContainer>
          <RoomContainer>
            <Name>
              <a href="/#">room4</a>
            </Name>
            <DeleteButton>X</DeleteButton>
            <RoomInfo>
              <div className="userTotal"> totalUser : 5</div>
              <div className="liveUser"> userIn : 4</div>
            </RoomInfo>
          </RoomContainer>
          <RoomContainer>
            <Name>
              <a href="/#">room5</a>
            </Name>
            <DeleteButton>X</DeleteButton>
            <RoomInfo>
              <div className="userTotal"> totalUser : 5</div>
              <div className="liveUser"> userIn : 4</div>
            </RoomInfo>
          </RoomContainer>
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
