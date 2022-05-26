import { createScreenVideoTrack, AgoraVideoPlayer } from "agora-rtc-react";
import { useContext, useEffect, useState } from "react";
import { RtcContext } from "../../context/rtcContext";
import { useClient } from "../../utill/Agora.config";

import {
  ShareScreenContainer,
  ShareVideoContainer,
  Video,
  CamIcon,
} from "./ShareScreen.styles";

export const useScreenTracks = createScreenVideoTrack(
  {
    encoderConfig: {
      framerate: 15,
      height: 720,
      width: 1280,
    },
  },
  "auto"
);

function ShareScreen() {
  const client = useClient();
  const { ready, tracks } = useScreenTracks();
  const [screenTrack, setScreenTrack] = useState(null);
  // const { rtcUsers } = useContext(RtcContext);

  useEffect(() => {
    const init = async () => {
      if (tracks instanceof Array) {
        setScreenTrack({ videoTrack: tracks[0], AudioTrack: tracks[1] });
        await client.publish([tracks[0], tracks[1]]);
      } else {
        setScreenTrack({ videoTrack: tracks });
        await client.publish([tracks]);
      }
      // if (screenTrack) {
      //   screenTrack.videoTrack.on("track ended", async () => {
      //     screenTrack.videoTrack && screenTrack.videoTrack.close();
      //     screenTrack.AudioTrack && screenTrack.AudioTrack.close();
      //     client.removeAllListeners();
      //     await client.unpublish([tracks]);
      //     setScreenTrack(null);
      //   });
      // }
    };

    if (ready && tracks) {
      console.log("init ready", tracks);
      init();
    }
  }, [client, ready, tracks]);

  return (
    <ShareScreenContainer>
      <ShareVideoContainer>
        {ready && tracks && screenTrack ? (
          <Video videoTrack={screenTrack.videoTrack} />
        ) : (
          <CamIcon />
        )}
      </ShareVideoContainer>
    </ShareScreenContainer>
  );
}

export default ShareScreen;
