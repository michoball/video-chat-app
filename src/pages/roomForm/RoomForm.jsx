import { config } from "../../utill/Agora.config";
import {
  RoomFormContainer,
  FormContainer,
  ButtonContainer,
  FormSpinner,
} from "./RoomForm.styles";
import FormInput from "../../UI/formInput/FormInput";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createandAddRoomDocuments,
  getUserRoomArray,
} from "../../utill/firebase/firebase.document";
import { UserContext } from "../../context/userContext";

const RoomForm = () => {
  // roomId 를 useParams 로 해서 videos.jsx에서 params로 room찾아가기
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [roomId, setRoomId] = useState("");
  const { currentUser } = useContext(UserContext);

  const roomIdHandler = (e) => {
    setRoomId(e.target.value);
  };

  const clearRoomId = () => setRoomId("");

  useEffect(() => {
    const userRoom = async (user) => {
      const snapShot = await getUserRoomArray(user);
      console.log(snapShot.map((room) => room.data()));
    };

    userRoom(currentUser);
  }, []);

  const roomSubmitHandler = async (e) => {
    e.preventDefault();
    let roomUid = "";
    if (roomId === "") {
      return;
    }
    try {
      setIsLoading(true);
      const room = await createandAddRoomDocuments(roomId, currentUser);
      console.log(room);
      roomUid = room.id;
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    clearRoomId();
    if (!roomUid) {
      return;
    }
    navigate(`/room/${roomUid}`);
  };

  return (
    <RoomFormContainer>
      <h1 className="heading">Enter the room Number</h1>
      <FormContainer onSubmit={roomSubmitHandler}>
        {config.appId === "" && (
          <p style={{ color: "red" }}>
            Please enter your Agora App ID in App.tsx and refresh the page
          </p>
        )}
        <FormInput
          label="RoomName"
          type="text"
          placeholder="Enter Channel Name"
          value={roomId}
          onChange={roomIdHandler}
        />
        <ButtonContainer>
          <Button variant="contained" color="primary" type="submit">
            {isLoading ? <FormSpinner /> : "Join"}
          </Button>
        </ButtonContainer>
      </FormContainer>
    </RoomFormContainer>
  );
};

export default RoomForm;
