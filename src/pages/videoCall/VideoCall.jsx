import { useContext, useEffect } from "react";
import {
  config,
  useClient,
  MicrophoneAndCameraTracks,
} from "../../utill/Agora.config";
import Controls from "../../components/videoControl/Controls";
import Videos from "../../components/video/Videos";
import { useParams } from "react-router-dom";
import { RtcContext } from "../../context/rtcContext";

import {
  VideoCallContainer,
  RoomContainer,
  MessageCallContainer,
} from "./VideoCall.style";
import MessageCall from "../messageCall/MessageCall";

function VideoCall() {
  const { roomId } = useParams();
  const client = useClient();
  const {
    start,
    addRtcUser,
    removeRtcUser,
    toggleStart,
    setLocalUser,
    clearRtcUser,
  } = useContext(RtcContext);

  const { ready, tracks } = MicrophoneAndCameraTracks();

  useEffect(() => {
    // console.log("starting point", roomId, client.uid);
    const init = async (roomName) => {
      // remote user가 들어오고 나가고 할 때 event handler
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          console.log("new published User : ", user, mediaType);
          addRtcUser(user);
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }

        console.log("subscribe success", user, "client", client);
      });

      client.on("user-unpublished", async (user, mediaType) => {
        await client.unsubscribe(user, mediaType);
        console.log("unpublished", user, mediaType);
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
        setLocalUser({
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
    <RoomContainer>
      <VideoCallContainer>
        {ready && tracks && <Controls tracks={tracks} />}
        {start && tracks && <Videos />}
      </VideoCallContainer>
      <MessageCallContainer>{start && <MessageCall />}</MessageCallContainer>
    </RoomContainer>
  );
}

export default VideoCall;
