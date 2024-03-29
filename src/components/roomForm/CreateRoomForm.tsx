import {
  RoomContainer,
  RoomFormContainer,
  ButtonContainer,
  FormSpinner,
  RoomFormBtn,
  Backdrop,
  RoomFormInput,
} from "./RoomForm.styles";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { createRoomStart } from "../../store/room/room.action";
import {
  selectRoomInfo,
  selectRoomLoading,
} from "../../store/room/room.selector";

type CreateRoomFormProps = {
  onToggleForm: () => void;
};

const RoomForm: FC<CreateRoomFormProps> = ({ onToggleForm }) => {
  // roomId 를 useParams 로 해서 videos.jsx에서 params로 room찾아가기
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const roomLoading = useSelector(selectRoomLoading);
  const roomInfo = useSelector(selectRoomInfo);

  useEffect(() => {
    if (roomInfo) {
      navigate(`/room/${roomInfo.roomId}`);
    }
  }, [roomInfo, navigate]);

  const roomNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const clearRoomName = () => setRoomName("");

  const roomSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roomName === "") return;

    try {
      roomName.trim();
      if (currentUser) dispatch(createRoomStart(roomName.trim(), currentUser));
    } catch (error) {
      console.log(error);
    } finally {
      clearRoomName();
    }
  };

  const toggleBackdropHandler = () => {
    onToggleForm();
  };

  return (
    <>
      <RoomContainer>
        <h3>Create</h3>
        <RoomFormContainer onSubmit={roomSubmitHandler} color={"#a52aca"}>
          <p>Enter the New Room name</p>
          <RoomFormInput
            type="text"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={roomNameHandler}
          />
          <ButtonContainer>
            <RoomFormBtn type="submit">
              {roomLoading ? <FormSpinner /> : "Create"}
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
