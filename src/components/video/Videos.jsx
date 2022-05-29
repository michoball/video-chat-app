import { VideosContainer } from "./Videos.styles";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import { useContext, useEffect } from "react";
import { RtcContext } from "../../context/rtcContext";
// import { useClient } from "../../utill/Agora.config";

function Videos() {
  //const client = useClient();
  const { rtcUsers, localUser } = useContext(RtcContext);
  console.log("videos Rtc Users List : ", rtcUsers);

  return (
    <VideosContainer id="videos">
      <VideoPlayer user={localUser.user} track={localUser.videoTrack} />
      {rtcUsers.length > 0 &&
        rtcUsers.map((user) => {
          if (user.videoTrack) {
            return (
              <VideoPlayer
                className="vid"
                user={user}
                id={user.uid}
                track={user.videoTrack}
                key={user.uid}
              />
            );
          } else return null;
        })}
    </VideosContainer>
  );
}

export default Videos;
