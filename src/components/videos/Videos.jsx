import {
  VideosContainer,
  RemoteUserVideoContianer,
  LocalUserVideoContianer,
  ShareOrBigVideoContianer,
} from "./Videos.styles";
import ShareScreen from "../../components/shareScreen/ShareScreen";
import VideoPlayer, { VIDEO_TYPE_CLASS } from "../videoPlayer/VideoPlayer";
import { useSelector } from "react-redux";
import {
  selectRtcLocalUser,
  selectRtcShare,
  selectRtcUsers,
  selectRtcBig,
} from "../../store/rtc/rtc.selector";
import RoomInfo from "../roomInfo/RoomInfo";
import { selectRtmChannel, selectRtmUsers } from "../../store/rtm/rtm.selector";
import { selectRoomInfo } from "../../store/room/room.selector";
import { useEffect } from "react";

function Videos() {
  const rtcUsers = useSelector(selectRtcUsers);
  const localUser = useSelector(selectRtcLocalUser);
  const share = useSelector(selectRtcShare);
  const bigSizeVideo = useSelector(selectRtcBig);

  const roomInfo = useSelector(selectRoomInfo);
  const channel = useSelector(selectRtmChannel);
  const rtmUsers = useSelector(selectRtmUsers);

  useEffect(() => {
    const init = async () => {
      const user = await channel.getMembers();
      console.log(user);
    };
    if (rtcUsers && channel) {
      init();
    }
  }, [rtcUsers, channel]);
  // console.log("videos Rtc Users List : ", rtcUsers);

  return (
    <VideosContainer id="videos">
      <LocalUserVideoContianer>
        <VideoPlayer
          videoType={VIDEO_TYPE_CLASS.local}
          rtcUser={localUser}
          id={localUser.uid}
          track={localUser.tracks[0]}
        />
        {roomInfo && <RoomInfo roomInfo={roomInfo} />}
      </LocalUserVideoContianer>

      <ShareOrBigVideoContianer>
        {share && <ShareScreen localTracks={localUser.tracks[0]} />}
        {bigSizeVideo && (
          <VideoPlayer
            videoType={VIDEO_TYPE_CLASS.share}
            rtcUser={bigSizeVideo}
            id={bigSizeVideo.uid}
            track={bigSizeVideo._videoTrack}
            key={bigSizeVideo.uid}
          />
        )}
        <RemoteUserVideoContianer>
          {rtcUsers.length > 0 &&
            rtcUsers.map((rtcUser) => {
              if (rtcUser.size !== "big") {
                return (
                  <VideoPlayer
                    videoType={
                      rtcUser.size === "base"
                        ? VIDEO_TYPE_CLASS.base
                        : VIDEO_TYPE_CLASS.small
                    }
                    rtcUser={rtcUser}
                    id={rtcUser.uid}
                    track={rtcUser._videoTrack}
                    key={rtcUser.uid}
                  />
                );
              } else return null;
            })}
          <VideoPlayer
            videoType={"base"}
            id={24357452147}
            key={2678254}
            rtcUser={{ hasVideo: false, uid: 7777548 }}
          />
          <VideoPlayer
            videoType={"base"}
            id={243571152147}
            key={2678456}
            rtcUser={{ hasVideo: false, uid: 77378548 }}
          />
          <VideoPlayer
            videoType={"base"}
            id={79486}
            key={26746434}
            rtcUser={{ hasVideo: false, uid: 56685 }}
          />
          <VideoPlayer
            videoType={"base"}
            id={79116}
            key={2674132434}
            rtcUser={{ hasVideo: false, uid: 536677785 }}
          />
        </RemoteUserVideoContianer>
      </ShareOrBigVideoContianer>
    </VideosContainer>
  );
}

export default Videos;
