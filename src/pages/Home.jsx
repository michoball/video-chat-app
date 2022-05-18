import { useState } from "react";
import RoomForm from "../components/roomForm/RoomForm";
import VideoCall from "../components/VideoCall";

function Home() {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  return (
    <div>
      <h1 className="heading">Enter the room Number</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <RoomForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
}

export default Home;
