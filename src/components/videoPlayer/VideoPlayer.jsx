import { useState } from "react";
import { Video, UserNameTag, VideoContainer } from "./VideoPlayer.styles";

function VideoPlayer({ user, track }) {
  console.log(user);
  const [bigSize, setBigSize] = useState(false);

  const toggleSizeHandler = () => {
    setBigSize(!bigSize);
  };
  return (
    <VideoContainer
      className={bigSize ? "big" : ""}
      onClick={toggleSizeHandler}
    >
      <Video className="vid" videoTrack={track} />
      <UserNameTag>
        <p>{user.uid}</p>
      </UserNameTag>
    </VideoContainer>
  );
}

export default VideoPlayer;
