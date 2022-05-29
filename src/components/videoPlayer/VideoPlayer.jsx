import { useContext, useState } from "react";
import { RtcContext } from "../../context/rtcContext";
import {
  Video,
  UserNameTag,
  VideoContainer,
  VideoContainerSmall,
  CamIcon,
} from "./VideoPlayer.styles";

function VideoPlayer({ user, track }) {
  console.log(user);
  const [bigSize, setBigSize] = useState(false);
  const { share } = useContext(RtcContext);

  const CustomVideoContainer = share ? VideoContainerSmall : VideoContainer;

  const toggleSizeHandler = () => {
    setBigSize(!bigSize);
  };

  return (
    <CustomVideoContainer
      className={bigSize && "big"}
      onClick={!share ? toggleSizeHandler : undefined}
    >
      {/* {track && <Video videoTrack={track} />} */}
      {track.enabled || user.hasVideo ? (
        <Video videoTrack={track} />
      ) : (
        <CamIcon />
      )}
      <UserNameTag>
        <p>{user.uid}</p>
      </UserNameTag>
    </CustomVideoContainer>
  );
}

export default VideoPlayer;
