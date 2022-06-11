import { useContext, useEffect, useState } from "react";
import {
  config,
  useClient,
  MicrophoneAndCameraTracks,
} from "../../utill/Agora.config";
import { createInstance } from "agora-rtm-sdk";

import { useParams } from "react-router-dom";
import { RtcContext } from "../../context/rtcContext";

import {
  VideoCallContainer,
  RoomContainer,
  MessageCallContainer,
} from "./Room.style";
import MessageCall from "../../components/messageCall/MessageCall";
import Spinner from "../../UI/spinner/spinner";
import VideoCall from "../../components/videoCall/VideoCall";
import { UserContext } from "../../context/userContext";
import { RtmContext } from "../../context/rtmContext";
import { getRoomInfo } from "../../utill/firebase/firebase.document";

function Room() {
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(false);
  const { roomId } = useParams();
  const client = useClient();
  const { setLocalUser, clearRtcUser } = useContext(RtcContext);
  const { setChannel, setRtmClient } = useContext(RtmContext);
  const { currentUser } = useContext(UserContext);
  const { ready, tracks } = MicrophoneAndCameraTracks();

  useEffect(() => {
    const getUserInfo = async () => {
      const roomInfo = await getRoomInfo(roomId);
      console.log(roomInfo);
    };

    getUserInfo();
  }, [roomId]);

  useEffect(() => {
    const init = async (roomName) => {
      try {
        setIsLoading(true);
        // client roomName 방에 입장
        const clientUid = await client.join(
          config.appId,
          roomName,
          config.token,
          null
        );
        //비디오 & 오디오 방안 사람들과 공유
        if (tracks) await client.publish([tracks[0], tracks[1]]);

        // 메세지 유저정보 만들기
        const RTMclient = createInstance(config.appId);
        // 혼자서 실험하려면 uid를 firebase currentUser uid로 하면 안됨 uid중복이라 안됨
        await RTMclient.login({ uid: String(clientUid), token: null });
        // 내 displayName 넣기
        await RTMclient.addOrUpdateLocalUserAttributes({
          name: currentUser.displayName,
        });
        // roomName 방에 채널을 만들기
        const rtmChannel = RTMclient.createChannel(roomName);
        // 방에 입장
        await rtmChannel.join();

        if (clientUid && rtmChannel) {
          setLocalUser({
            user: client,
            tracks: client.localTracks,
          });
          setChannel(rtmChannel);
          setRtmClient(RTMclient);
          setStart(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(`Room UseEffect has Error!!! : ${error}`);
      }
    };
    if (ready && tracks && client) {
      console.log("Room starting point", roomId, client);
      init(roomId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, client, ready, tracks, currentUser]);

  if (isLoading) {
    return <Spinner />;
  }

  window.addEventListener("popstate", async () => {
    tracks[0].close();
    tracks[1].close();
    await client.leave();
    client.removeAllListeners();
    clearRtcUser();
  });

  return (
    <RoomContainer>
      <VideoCallContainer>
        {ready && tracks && <VideoCall />}
      </VideoCallContainer>
      <MessageCallContainer>{start && <MessageCall />}</MessageCallContainer>
    </RoomContainer>
  );
}

export default Room;
