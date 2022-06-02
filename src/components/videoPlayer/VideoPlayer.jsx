import { useContext } from "react";
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

function VideoPlayer({ rtcUser, track, videoType }) {
  // const [bigSize, setBigSize] = useState(false);
  const { share, toggleBig } = useContext(RtcContext);

  const CustomVideoContainer = getVideoType(videoType, share);

  const toggleSizeHandler = () => {
    toggleBig(rtcUser);
  };

  return (
    <CustomVideoContainer onClick={!share ? toggleSizeHandler : undefined}>
      {track || rtcUser.user.hasVideo ? (
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
