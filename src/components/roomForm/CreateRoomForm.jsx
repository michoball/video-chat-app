import {
  RoomContainer,
  RoomFormContainer,
  ButtonContainer,
  FormSpinner,
  RoomFormBtn,
  Backdrop,
} from "./RoomForm.styles";
import FormInput from "../../UI/formInput/FormInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoomDocuments } from "../../utill/firebase/firebase.document";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { createRoomStart } from "../../store/room/room.action";
import {
  selectRoomInfo,
  selectRoomIsLoading,
} from "../../store/room/room.selector";

const RoomForm = ({ onToggleForm }) => {
  // roomId 를 useParams 로 해서 videos.jsx에서 params로 room찾아가기
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const roomIsLoading = useSelector(selectRoomIsLoading);
  const roomInfo = useSelector(selectRoomInfo);

  useEffect(() => {
    if (roomInfo.roomId) {
      console.log(roomInfo);
      navigate(`/room/${roomInfo.roomId}`);
    }
  }, [roomInfo]);

  const roomNameHandler = (e) => {
    setRoomName(e.target.value);
  };

  const clearRoomName = () => setRoomName("");

  const roomSubmitHandler = async (e) => {
    e.preventDefault();

    if (roomName === "") {
      return;
    }
    try {
      roomName.trim();
      dispatch(createRoomStart(roomName.trim(), currentUser));
    } catch (error) {
      console.log(error);
    }
    clearRoomName();
  };

  const toggleBackdropHandler = () => {
    onToggleForm();
  };

  return (
    <>
      <RoomContainer>
        <h3>Create New Room</h3>
        <RoomFormContainer onSubmit={roomSubmitHandler} color={"#a52aca"}>
          <FormInput
            label="RoomName"
            type="text"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={roomNameHandler}
          />
          <ButtonContainer>
            <RoomFormBtn type="submit">
              {roomIsLoading ? <FormSpinner /> : "Create"}
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
