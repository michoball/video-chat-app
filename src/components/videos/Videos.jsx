import {
  VideosContainer,
  BaseUserVideoContianer,
  LocalUserVideoContianer,
  SmallUserVideoContianer,
  ShareOrBigVideoContianer,
} from "./Videos.styles";
import ShareScreen from "../../components/shareScreen/ShareScreen";
import VideoPlayer, { VIDEO_TYPE_CLASS } from "../videoPlayer/VideoPlayer";
import { useSelector } from "react-redux";
import {
  selectRtcLocalUser,
  selectRtcShare,
  selectRtcBig,
  selectRtcBase,
  selectRtcSmall,
} from "../../store/rtc/rtc.selector";
import RoomInfo from "../roomInfo/RoomInfo";
import { selectRoomInfo } from "../../store/room/room.selector";

function Videos() {
  const localUser = useSelector(selectRtcLocalUser);
  const share = useSelector(selectRtcShare);
  const bigSizeRtc = useSelector(selectRtcBig);
  const baseSizeRtc = useSelector(selectRtcBase);
  const smallSizeRtc = useSelector(selectRtcSmall);

  const roomInfo = useSelector(selectRoomInfo);

  console.log(" big :", bigSizeRtc);
  console.log(" base :", baseSizeRtc);
  console.log(" small :", smallSizeRtc);
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
        {bigSizeRtc && (
          <VideoPlayer
            videoType={VIDEO_TYPE_CLASS.share}
            rtcUser={bigSizeRtc}
            id={bigSizeRtc.uid}
            track={bigSizeRtc._videoTrack}
            key={bigSizeRtc.uid}
          />
        )}
        <BaseUserVideoContianer>
          {baseSizeRtc.length > 0 &&
            baseSizeRtc.map((rtcUser) => {
              return (
                <VideoPlayer
                  videoType={VIDEO_TYPE_CLASS.base}
                  rtcUser={rtcUser}
                  id={rtcUser.uid}
                  track={rtcUser._videoTrack}
                  key={rtcUser.uid}
                />
              );
            })}
        </BaseUserVideoContianer>

        <SmallUserVideoContianer>
          {smallSizeRtc.length > 0 &&
            smallSizeRtc.map((rtcUser) => {
              return (
                <VideoPlayer
                  videoType={VIDEO_TYPE_CLASS.small}
                  rtcUser={rtcUser}
                  id={rtcUser.uid}
                  track={rtcUser._videoTrack}
                  key={rtcUser.uid}
                />
              );
            })}
          {/* <VideoPlayer
            videoType={VIDEO_TYPE_CLASS.small}
            rtcUser={{ hasVideo: null }}
            id="15135342114134"
            track={null}
            key="15353412164134"
          />
          <VideoPlayer
            videoType={VIDEO_TYPE_CLASS.small}
            rtcUser={{ hasVideo: null }}
            id="15353452114134"
            track={null}
            key="15355342164134"
          /> */}
        </SmallUserVideoContianer>
      </ShareOrBigVideoContianer>
    </VideosContainer>
  );
}

export default Videos;

// 테스트 유저
