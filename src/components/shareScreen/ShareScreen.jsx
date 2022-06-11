// import { createScreenVideoTrack } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useContext, useEffect, useState } from "react";
import { RtcContext } from "../../context/rtcContext";
import { useClient } from "../../utill/Agora.config";
import { CamIcon } from "../../UI/Icons";
import VideoPlayer, { VIDEO_TYPE_CLASS } from "../videoPlayer/VideoPlayer";
import { AgoraRTCErrorCode } from "agora-rtc-react";

function ShareScreen({ localTracks }) {
  const client = useClient();
  const { share, toggleShare } = useContext(RtcContext);

  const [screenTrack, setScreenTrack] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const screenShareVideoTrack = await AgoraRTC.createScreenVideoTrack(
          {
            encoderConfig: {
              framerate: 15,
              height: 720,
              width: 1280,
            },
          },
          "auto"
        );
        if (screenShareVideoTrack) {
          setScreenTrack(screenShareVideoTrack);
        }
      } catch (error) {
        if (error.code === AgoraRTCErrorCode.PERMISSION_DENIED) {
          alert(`Share Screen Failed ${error.code}`);
          toggleShare(false);
        }
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const init = async () => {
      await client.publish(screenTrack);

      screenTrack.on("track-ended", async () => {
        console.log("TRACK ENDEDDDDDDD~~~~!!!");
        await client
          .unpublish(screenTrack)
          .then(await client.publish(localTracks));

        toggleShare(false);
      });
    };

    if (screenTrack && share) {
      console.log("showScreen ready", screenTrack, client);
      client.unpublish(localTracks);
      init();
    }
  }, [client, screenTrack, share, localTracks, toggleShare]);

  return (
    <div>
      {screenTrack ? (
        <VideoPlayer videoType={VIDEO_TYPE_CLASS.share} track={screenTrack} />
      ) : (
        <CamIcon />
      )}
    </div>
  );
}

export default ShareScreen;
