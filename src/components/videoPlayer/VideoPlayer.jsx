import { useContext, useState } from "react";
import { RtcContext } from "../../context/rtcContext";
import {
  Video,
  UserNameTag,
  BaseVideoContainer,
  SmallVideoContainer,
  ShareVideoContainer,
  LocalVideoContainer,
} from "./VideoPlayer.styles";
import { CamIcon } from "../../UI/CanIcon";

export const VIDEO_TYPE_CLASS = {
  base: "base",
  local: "local",
  share: "share",
  small: "small",
};

const getVideoType = (VideoType = VIDEO_TYPE_CLASS.base, share) =>
  ({
    [VIDEO_TYPE_CLASS.base]: share ? SmallVideoContainer : BaseVideoContainer,
    [VIDEO_TYPE_CLASS.local]: LocalVideoContainer,
    [VIDEO_TYPE_CLASS.share]: ShareVideoContainer,
    [VIDEO_TYPE_CLASS.small]: SmallVideoContainer,
  }[VideoType]);

function VideoPlayer({ rtcUser, track, videoType, bigSize }) {
  // const [bigSize, setBigSize] = useState(false);
  const { share, toggleBig } = useContext(RtcContext);

  const CustomVideoContainer = getVideoType(videoType, share);

  const toggleSizeHandler = () => {
    console.log("toggle Video", rtcUser);
    toggleBig(rtcUser);
  };

  return (
    <CustomVideoContainer
      className={bigSize ? "big" : ""}
      onClick={!share ? toggleSizeHandler : undefined}
    >
      {track.enabled || rtcUser.user.hasVideo || track ? (
        <Video videoTrack={track} />
      ) : (
        <CamIcon />
      )}
      {rtcUser && (
        <UserNameTag>
          <p>{rtcUser.user.uid}</p>
        </UserNameTag>
      )}
    </CustomVideoContainer>
  );
}

export default VideoPlayer;
