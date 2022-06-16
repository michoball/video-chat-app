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

  const roomNameHandler = (e) => {
    setRoomName(e.target.value);
  };

  const clearRoomName = () => setRoomName("");

  const roomSubmitHandler = async (e) => {
    e.preventDefault();
    let roomUid = "";
    if (roomName === "") {
      return;
    }
    try {
      dispatch(createRoomStart(roomName, currentUser));
      // const room = await createRoomDocuments(roomName, currentUser);
      // roomUid = room.id;
      showRoomInfo();
    } catch (error) {
      console.log(error);
    }
    clearRoomName();
    if (!roomUid) {
      return;
    }
    // navigate(`/room/${roomUid}`);
  };

  const toggleBackdropHandler = () => {
    onToggleForm();
  };

  const showRoomInfo = () => {
    console.log(roomInfo);
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

export default RoomForm;
