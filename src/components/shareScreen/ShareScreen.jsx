// import { createScreenVideoTrack } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useContext, useEffect, useState } from "react";
import { RtcContext } from "../../context/rtcContext";
import { useClient } from "../../utill/Agora.config";
import {
  ShareScreenContainer,
  ShareVideoContainer,
  Video,
  CamIcon,
} from "./ShareScreen.styles";

function ShareScreen({ localTracks }) {
  const client = useClient();
  const { share, toggleShare } = useContext(RtcContext);
  // const { rtcUsers } = useContext(RtcContext);

  const [screenTrack, setScreenTrack] = useState(null);

  useEffect(() => {
    const init = async () => {
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
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      await client.publish(screenTrack);

      screenTrack.on("track-ended", async () => {
        console.log("TRACK ENDEDDDDDDD~~~~!!!");
        await client
          .unpublish(screenTrack)
          .then(await client.publish(localTracks[1]));

        toggleShare(false);
      });
    };

    if (screenTrack && share) {
      console.log("showScreen ready", screenTrack, client);
      client.unpublish(localTracks[1]);
      init();
    }
  }, [client, screenTrack, share, localTracks, toggleShare]);

  return (
    <ShareScreenContainer>
      <ShareVideoContainer>
        {screenTrack ? <Video videoTrack={screenTrack} /> : <CamIcon />}
      </ShareVideoContainer>
    </ShareScreenContainer>
  );
}

export default ShareScreen;
