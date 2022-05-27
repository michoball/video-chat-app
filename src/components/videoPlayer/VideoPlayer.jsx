import { useContext, useState } from "react";
import { RtcContext } from "../../context/rtcContext";
import { Video, UserNameTag, VideoContainer } from "./VideoPlayer.styles";

function VideoPlayer({ user, track }) {
  console.log(user);
  const [bigSize, setBigSize] = useState(false);
  const { share } = useContext(RtcContext);

  const toggleSizeHandler = () => {
    setBigSize(!bigSize);
  };
  return (
    <VideoContainer
      width={share ? true : undefined}
      height={share ? "200px" : undefined}
      className={bigSize && "big"}
      onClick={!share ? toggleSizeHandler : undefined}
    >
      <Video videoTrack={track} />
      <UserNameTag>
        <p>{user.uid}</p>
      </UserNameTag>
    </VideoContainer>
  );
}

export default VideoPlayer;
