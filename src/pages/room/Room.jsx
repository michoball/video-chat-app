import VideoCall from "../videoCall/VideoCall";
import MessageCall from "../messageCall/MessageCall";

import { RoomContainer } from "./Room.styles";

function Room() {
  return (
    <RoomContainer>
      <VideoCall />
      {/* <MessageCall /> */}
    </RoomContainer>
  );
}

export default Room;
