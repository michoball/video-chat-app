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
import { findRoomAndAddInfoDocuments } from "../../utill/firebase/firebase.document";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const JoinRoomForm = ({ onToggleForm }) => {
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

    if (roomId === "") {
      return;
    }
    try {
      setIsLoading(true);
      await findRoomAndAddInfoDocuments(roomId, currentUser);

      setIsLoading(false);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    clearRoomId();
  };

  const toggleBackdropHandler = () => {
    onToggleForm();
  };

  return (
    <>
      <RoomContainer>
        <h3>Join the Room</h3>
        <RoomFormContainer onSubmit={roomSubmitHandler} color={"#0ABF04"}>
          <FormInput
            label="Room Id"
            type="text"
            placeholder="Enter Room Id"
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

export default JoinRoomForm;
