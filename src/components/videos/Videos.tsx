import {
  VideosContainer,
  BaseUserVideoContianer,
  LocalUserVideoContianer,
  SmallUserVideoContianer,
  ShareOrBigVideoContianer,
} from "./Videos.styles";
import ShareScreen from "../shareScreen/ShareScreen";
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
import { ILocalVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";

function Videos() {
  const localUser = useSelector(selectRtcLocalUser);
  const share = useSelector(selectRtcShare);
  const bigSizeRtc = useSelector(selectRtcBig);
  const baseSizeRtc = useSelector(selectRtcBase);
  const smallSizeRtc = useSelector(selectRtcSmall);

  const roomInfo = useSelector(selectRoomInfo);

  // selector 로 들어온 user video size와 local 인지 remote User인지에 따라서 container 구분
  return (
    <VideosContainer id="videos">
      <LocalUserVideoContianer>
        {localUser !== null && (
          <VideoPlayer
            videoType={VIDEO_TYPE_CLASS.local}
            rtcUser={localUser.user}
            // id 값은 유저 구분과 이름 태그를 달기 위한 값 -> 현재는 필요 없어서 주석처리
            // id={localUser.user.uid}
            track={localUser.tracks[0] as ILocalVideoTrack}
          />
        )}
        {roomInfo && <RoomInfo roomInfo={roomInfo} />}
      </LocalUserVideoContianer>

      <ShareOrBigVideoContianer>
        {share && localUser && (
          <ShareScreen localTracks={localUser.tracks[0]} />
        )}
        {bigSizeRtc && (
          <VideoPlayer
            videoType={VIDEO_TYPE_CLASS.share}
            rtcUser={bigSizeRtc.user}
            // id={bigSizeRtc[0].uid}
            track={bigSizeRtc.user.videoTrack as IRemoteVideoTrack}
            key={bigSizeRtc.uid}
          />
        )}
        <BaseUserVideoContianer>
          {baseSizeRtc.length > 0 &&
            baseSizeRtc.map((rtcUser) => {
              return (
                <VideoPlayer
                  videoType={VIDEO_TYPE_CLASS.base}
                  rtcUser={rtcUser.user}
                  // id={rtcUser.uid}
                  track={rtcUser.user.videoTrack as IRemoteVideoTrack}
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
                  rtcUser={rtcUser.user}
                  // id={rtcUser.uid}
                  track={rtcUser.user.videoTrack as IRemoteVideoTrack}
                  key={rtcUser.uid}
                />
              );
            })}
        </SmallUserVideoContianer>
      </ShareOrBigVideoContianer>
    </VideosContainer>
  );
}

export default Videos;

// 테스트 유저

//  <VideoPlayer
//             videoType={VIDEO_TYPE_CLASS.small}
//             rtcUser={{ hasVideo: null }}
//             id="15135342114134"
//             track={null}
//             key="15353412164134"
//           />
//           <VideoPlayer
//             videoType={VIDEO_TYPE_CLASS.small}
//             rtcUser={{ hasVideo: null }}
//             id="15353452114134"
//             track={null}
//             key="15355342164134"
//           />
