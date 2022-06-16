import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useClient } from "../../utill/Agora.config";
import { CamIcon } from "../../UI/Icons";
import VideoPlayer, { VIDEO_TYPE_CLASS } from "../videoPlayer/VideoPlayer";
import { AgoraRTCErrorCode } from "agora-rtc-react";
import { useDispatch, useSelector } from "react-redux";
import { selectRtcUsers, selectRtcShare } from "../../store/rtc/rtc.selector";
import { toggleShare } from "../../store/rtc/rtc.action";

function ShareScreen({ localTracks }) {
  const client = useClient();
  const dispatch = useDispatch();
  const rtcUsers = useSelector(selectRtcUsers);
  const share = useSelector(selectRtcShare);

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
          dispatch(toggleShare(rtcUsers, false));
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
        await client
          .unpublish(screenTrack)
          .then(await client.publish(localTracks));

        dispatch(toggleShare(rtcUsers, false));
      });
    };

    if (screenTrack && share) {
      console.log("showScreen ready", screenTrack, client);
      client.unpublish(localTracks);
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, screenTrack, share, localTracks, toggleShare, rtcUsers]);

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
