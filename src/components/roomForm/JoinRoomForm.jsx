import {
  RoomContainer,
  RoomFormContainer,
  ButtonContainer,
  FormSpinner,
  RoomFormBtn,
  Backdrop,
  RoomFormInput,
} from "./RoomForm.styles";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { joinRoomStart } from "../../store/room/room.action";
import {
  selectRoomInfo,
  selectRoomLoading,
} from "../../store/room/room.selector";

const JoinRoomForm = ({ onToggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const roomLoading = useSelector(selectRoomLoading);
  const roomInfo = useSelector(selectRoomInfo);

  useEffect(() => {
    if (roomInfo) {
      console.log(roomInfo);
      navigate(`/room/${roomInfo.roomId}`);
    }
  }, [roomInfo]);

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
      dispatch(joinRoomStart(roomId.trim(), currentUser));
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
        <h3>Join</h3>
        <RoomFormContainer onSubmit={roomSubmitHandler} color={"#0ABF04"}>
          <p>Enter the Room ID</p>
          <RoomFormInput
            type="text"
            placeholder="Enter Room Id"
            value={roomId}
            onChange={roomIdHandler}
          />
          <ButtonContainer>
            <RoomFormBtn type="submit">
              {roomLoading ? <FormSpinner /> : "Join"}
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
