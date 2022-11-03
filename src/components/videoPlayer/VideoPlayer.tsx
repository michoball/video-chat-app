import { useDispatch, useSelector } from "react-redux";
import { selectRtcShare, selectRtcUsers } from "../../store/rtc/rtc.selector";
import { toggleBig } from "../../store/rtc/rtc.action";
import {
  Video,
  BaseVideoContainer,
  SmallVideoContainer,
  ShareVideoContainer,
  LocalVideoContainer,
} from "./VideoPlayer.styles";

import {
  ICameraVideoTrack,
  IRemoteVideoTrack,
  ILocalVideoTrack,
  IAgoraRTCRemoteUser,
  IAgoraRTCClient,
  UID,
} from "agora-rtc-sdk-ng";
import { CamIcon } from "../../UI/Icons";
import { FC } from "react";

export enum VIDEO_TYPE_CLASS {
  base = "base",
  local = "local",
  share = "share",
  small = "small",
}
// video type에 따른 다른 컴포넌트 넘기기
const getVideoType = (
  VideoType = VIDEO_TYPE_CLASS.base,
  share: boolean
): typeof BaseVideoContainer =>
  ({
    [VIDEO_TYPE_CLASS.base]: share ? SmallVideoContainer : BaseVideoContainer,
    [VIDEO_TYPE_CLASS.local]: LocalVideoContainer,
    [VIDEO_TYPE_CLASS.share]: ShareVideoContainer,
    [VIDEO_TYPE_CLASS.small]: SmallVideoContainer,
  }[VideoType]);

export type VideoPlayerProps = {
  rtcUser?: IAgoraRTCRemoteUser | IAgoraRTCClient;
  track: ICameraVideoTrack | IRemoteVideoTrack | ILocalVideoTrack;
  videoType?: VIDEO_TYPE_CLASS;
  id?: UID;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ rtcUser, track, videoType }) => {
  const dispatch = useDispatch();
  const rtcUsers = useSelector(selectRtcUsers);
  const share = useSelector(selectRtcShare);

  const CustomVideoContainer = getVideoType(videoType, share);

  const toggleSizeHandler = () => {
    if (rtcUser) {
      dispatch(toggleBig(rtcUsers, rtcUser));
    }
  };

  return (
    <CustomVideoContainer
      onClick={
        !share && videoType !== VIDEO_TYPE_CLASS.local
          ? toggleSizeHandler
          : undefined
      }
    >
      {rtcUser && track ? <Video videoTrack={track} /> : <CamIcon />}
    </CustomVideoContainer>
  );
};

export default VideoPlayer;
