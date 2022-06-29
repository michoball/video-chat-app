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
import { selectRoomInfo } from "../../store/room/room.selector";

function Videos() {
  const rtcUsers = useSelector(selectRtcUsers);
  const localUser = useSelector(selectRtcLocalUser);
  const share = useSelector(selectRtcShare);
  const bigSizeVideo = useSelector(selectRtcBig);

  const roomInfo = useSelector(selectRoomInfo);

  // selector 로 들어온 user video size와 local 인지 remote User인지에 따라서 container 구분
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
        </RemoteUserVideoContianer>
      </ShareOrBigVideoContianer>
    </VideosContainer>
  );
}

export default Videos;
