import { useContext, useEffect, useState } from "react";
import { RtcContext } from "../../context/rtcContext";
import { useClient, ScreenTracks } from "../../utill/Agora.config";
import {
  ShareScreenContainer,
  ShareVideoContainer,
  Video,
  CamIcon,
} from "./ShareScreen.styles";

function ShareScreen({ localTracks }) {
  const client = useClient();
  const { share } = useContext(RtcContext);
  const { ready, tracks } = ScreenTracks();
  // const [screenTrack, setScreenTrack] = useState(null);

  // const { rtcUsers } = useContext(RtcContext);

  useEffect(() => {
    const init = async () => {
      await client.publish(tracks);

      tracks.on("track-ended", async () => {
        console.log("TRACK ENDEDDDDDDD~~~~!!!");
        await client.unpublish(tracks);
        await client.publish(localTracks);
      });
    };

    if (ready && tracks && share) {
      console.log("showScreen ready", tracks, client);
      client.unpublish([localTracks[1]]);
      init();
    }
  }, [client, tracks, ready, share, localTracks]);

  return (
    <ShareScreenContainer>
      <ShareVideoContainer>
        {ready && tracks ? <Video videoTrack={tracks} /> : <CamIcon />}
      </ShareVideoContainer>
    </ShareScreenContainer>
  );
}

export default ShareScreen;
