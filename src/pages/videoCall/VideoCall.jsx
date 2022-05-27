import {
  config,
  useClient,
  MicrophoneAndCameraTracks,
} from "../../utill/Agora.config";
import AgoraRTM from "agora-rtm-sdk";
import { useContext, useEffect } from "react";
import Controls from "../../components/videoControl/Controls";
import Videos from "../../components/video/Videos";
import ShareScreen from "../../components/shareScreen/ShareScreen";
import { useParams } from "react-router-dom";
import { VideoCallContainer } from "./VideoCall.style";
import { RtcContext } from "../../context/rtcContext";

function VideoCall() {
  const { roomId } = useParams();
  const client = useClient();
  const { start, addRtcUser, removeRtcUser, toggleStart, clearRtcUser, share } =
    useContext(RtcContext);

  const { ready, tracks } = MicrophoneAndCameraTracks();

  useEffect(() => {
    // console.log("starting point", roomId, client.uid);
    const init = async (roomName) => {
      // remote user가 들어오고 나가고 할 때 event handler
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success", user, "client", client);
        if (mediaType === "video") {
          addRtcUser({ user: user, videoTrack: user.videoTrack });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        console.log("unpublished", user, mediaType);
        if (mediaType === "audio") {
          user.audioTrack?.stop();
        }
        if (mediaType === "video") {
          removeRtcUser(user);
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        removeRtcUser(user);
      });

      const clientjoined = await client.join(
        config.appId,
        roomName,
        config.token,
        null
      );

      if (tracks) await client.publish([tracks[0], tracks[1]]);

      if (clientjoined) {
        addRtcUser({
          user: client,
          videoTrack: client.localTracks[0],
        });
      }
      console.log("client", client);

      toggleStart(true);
    };

    if (ready && tracks && client) {
      console.log("init ready");
      console.log("starting point", roomId, client);
      init(roomId);
    }
  }, [roomId, client, ready, tracks]);

  window.onpopstate = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    clearRtcUser();
    toggleStart(false);
  };

  return (
    <VideoCallContainer>
      {share && <ShareScreen localTracks={tracks} />}
      {ready && tracks && <Controls tracks={tracks} />}
      {start && tracks && <Videos />}
    </VideoCallContainer>
  );
}

export default VideoCall;
