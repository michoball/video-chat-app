import {
  VideosContainer,
  RemoteUserVideoContianer,
  LocalUserVideoContianer,
  ShareOrBigVideoContianer,
} from "./Videos.styles";
import ShareScreen from "../../components/shareScreen/ShareScreen";
import VideoPlayer, { VIDEO_TYPE_CLASS } from "../videoPlayer/VideoPlayer";
import { useContext } from "react";
import { RtcContext } from "../../context/rtcContext";

// import { useClient } from "../../utill/Agora.config";

function Videos() {
  //const client = useClient();
  const { rtcUsers, localUser, share } = useContext(RtcContext);
  console.log("videos Rtc Users List : ", rtcUsers);

  const bigSizeVideo = rtcUsers.find((rtcUser) => rtcUser.size === "big");

  return (
    <VideosContainer id="videos">
      <LocalUserVideoContianer>
        <VideoPlayer
          videoType={VIDEO_TYPE_CLASS.local}
          rtcUser={localUser}
          id={localUser.uid}
          track={localUser.videoTrack}
        />
      </LocalUserVideoContianer>

      <ShareOrBigVideoContianer>
        {share && <ShareScreen localTracks={localUser.videoTrack} />}
        {bigSizeVideo && (
          <VideoPlayer
            videoType={VIDEO_TYPE_CLASS.share}
            rtcUser={bigSizeVideo}
            id={bigSizeVideo.user.uid}
            track={bigSizeVideo.user.videoTrack}
            key={bigSizeVideo.user.uid}
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
                    id={rtcUser.user.uid}
                    track={rtcUser.user.videoTrack}
                    key={rtcUser.user.uid}
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
