import { config } from "../../utill/Agora.config";
import {
  RoomFormContainer,
  FormContainer,
  ButtonContainer,
} from "./RoomForm.styles";
import FormInput from "../../components/formInput/FormInput";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomForm = () => {
  // roomId 를 useSearchParams 로 해서 videos.jsx에서 params로 room찾아가기
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const roomIdHandler = (e) => {
    setRoomId(e.target.value);
  };

  const clearRoomId = () => setRoomId("");

  const roomSubmitHandler = (e) => {
    e.preventDefault();

    console.log(roomId);
    navigate(`/room/${roomId}`);
    clearRoomId();
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Join
          </Button>
        </ButtonContainer>
      </FormContainer>
    </RoomFormContainer>
  );
};

export default RoomForm;
