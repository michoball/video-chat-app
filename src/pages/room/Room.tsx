import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  config,
  useClient,
  MicrophoneAndCameraTracks,
} from "../../utill/Agora.config";
import AgoraRTM from "agora-rtm-sdk";

import {
  VideoCallContainer,
  RoomContainer,
  MessageCallContainer,
  MessageIcon,
  ToggleCollapse,
} from "./Room.style";
import MessageCall from "../../components/messageCall/MessageCall";
import Spinner from "../../UI/spinner/spinner";
import VideoCall from "../../components/videoCall/VideoCall";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setLocalUser, clearRtcUser } from "../../store/rtc/rtc.action";
import { setChannel, setRtmClient } from "../../store/rtm/rtm.action";
import { joinRoomStart } from "../../store/room/room.action";
import { UserDataNId } from "../../store/user/user.type";
import {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

function Room() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [messageShow, setMessageShow] = useState(true);
  // 사용이유 불분명
  // const messageRef = useRef();

  const client = useClient();

  const { roomId } = useParams();
  const { ready, tracks } = MicrophoneAndCameraTracks();

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser && roomId) {
      dispatch(joinRoomStart(roomId, currentUser));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, roomId]);

  useEffect(() => {
    const init = async (roomName: string, currentUser: UserDataNId) => {
      try {
        setIsLoading(true);
        // client roomName 방에 입장
        const clientUid = await client.join(
          config.appId,
          roomName,
          config.token,
          null
        );
        //비디오 & 오디오 방안 사람들과 공유.

        if (tracks) await client.publish([tracks[0], tracks[1]]);

        // 메세지 유저정보 만들기
        const RTMclient = AgoraRTM.createInstance(config.appId);
        // 혼자서 실험하려면 uid를 firebase currentUser uid로 하면 안됨 uid중복이라 안됨
        await RTMclient.login({ uid: String(clientUid) });
        // 내 displayName 넣기
        await RTMclient.addOrUpdateLocalUserAttributes({
          name: currentUser.displayName,
        });
        // roomName 방에 채널을 만들기
        const rtmChannel = RTMclient.createChannel(roomName);
        // 방에 입장
        await rtmChannel.join();

        if (clientUid && rtmChannel && tracks) {
          const localUser: {
            user: IAgoraRTCClient;
            tracks: [ICameraVideoTrack, IMicrophoneAudioTrack];
          } = {
            user: client,
            tracks: [tracks[1], tracks[0]],
          };

          dispatch(setLocalUser(localUser));
          dispatch(setChannel(rtmChannel));
          dispatch(setRtmClient(RTMclient));
          setStart(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(`Room UseEffect has Error!!! : ${error}`);
      }
    };
    if (ready && tracks && client && currentUser) {
      console.log("Room starting point", roomId, client);
      if (roomId) {
        init(roomId, currentUser);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, client, ready, tracks, currentUser]);

  if (isLoading) {
    return <Spinner />;
  }

  // 방 입장후 뒤로가기 시
  window.onpopstate = async () => {
    if (tracks) {
      tracks[0].close();
      tracks[1].close();
      await client.leave();
      client.removeAllListeners();
    }
    dispatch(clearRtcUser());
  };

  return (
    <RoomContainer>
      <VideoCallContainer>
        {ready && tracks && <VideoCall />}
      </VideoCallContainer>

      {start && (
        <>
          <MessageCallContainer
            className={messageShow ? "show" : "hide"}
            // ref={messageRef}
          >
            <ToggleCollapse
              onClick={(e) => {
                setMessageShow(false);
              }}
            />
            <MessageCall />
          </MessageCallContainer>
          <MessageIcon
            onClick={(e) => {
              setMessageShow(true);
            }}
          />
        </>
      )}
    </RoomContainer>
  );
}

export default Room;
