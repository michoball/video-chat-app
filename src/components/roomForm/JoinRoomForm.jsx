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
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { findRoomStart } from "../../store/room/room.action";
import { selectRoomIsLoading } from "../../store/room/room.selector";

const JoinRoomForm = ({ onToggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const roomIsLoading = useSelector(selectRoomIsLoading);

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
      const roomIdCredential = dispatch(findRoomStart(roomId, currentUser));

      if (roomIdCredential) {
        navigate(`/room/${roomId}`);
      }
    } catch (error) {
      console.log(error);
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
              {roomIsLoading ? <FormSpinner /> : "Join"}
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
