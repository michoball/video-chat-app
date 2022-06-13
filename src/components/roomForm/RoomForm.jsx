import { config } from "../../utill/Agora.config";
import {
  RoomContainer,
  RoomFormContainer,
  ButtonContainer,
  FormSpinner,
  RoomFormBtn,
  Backdrop,
} from "./RoomForm.styles";
import FormInput from "../../UI/formInput/FormInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createandAddRoomDocuments } from "../../utill/firebase/firebase.document";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const RoomForm = ({ onToggleForm }) => {
  // roomId 를 useParams 로 해서 videos.jsx에서 params로 room찾아가기
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [roomId, setRoomId] = useState("");
  const currentUser = useSelector(selectCurrentUser);

  const roomIdHandler = (e) => {
    setRoomId(e.target.value);
  };

  const clearRoomId = () => setRoomId("");

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

  const toggleBackdropHandler = () => {
    onToggleForm();
  };

  return (
    <>
      <RoomContainer>
        <h3 className="heading">Create New Room</h3>
        <RoomFormContainer onSubmit={roomSubmitHandler}>
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
            <RoomFormBtn type="submit">
              {isLoading ? <FormSpinner /> : "Join"}
            </RoomFormBtn>
            <RoomFormBtn
              className="cancel"
              type="button"
              onClick={toggleBackdropHandler}
            >
              Cancel
            </RoomFormBtn>
          </ButtonContainer>
        </RoomFormContainer>
      </RoomContainer>
      <Backdrop onClick={toggleBackdropHandler} />
    </>
  );
};

export default RoomForm;
