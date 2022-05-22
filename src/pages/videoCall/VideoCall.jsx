import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from "../../utill/Agora.config";
import { createScreenVideoTrack } from "agora-rtc-react";
import AgoraRTM from "agora-rtm-sdk";
import { useContext, useEffect, useState } from "react";
import Controls from "../../components/videoControl/Controls";
import Videos from "../../components/video/Videos";
import { useParams } from "react-router-dom";
import { VideoCallContainer } from "./VideoCall.style";
import { UserContext } from "../../context/userContext";

let joinId = String(Math.floor(Math.random() * 10000));

function VideoCall() {
  const { roomId } = useParams();

  const [start, setStart] = useState(false);

  const client = useClient();
  const { currentUser } = useContext(UserContext);
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [localTrack, setlocalTrack] = useState(null);
  const [users, setUsers] = useState([
    { name: currentUser.displayName, client: client },
  ]);

  // useEffect(() => {
  //   const init = async (roomName) => {
  //     const rtmClient = await AgoraRTM.createInstance(config.appId);
  //     await rtmClient.login({ uid: currentUser.id, token: null });
  //     let channel = await rtmClient.createChannel(roomName);
  //     await channel.join();
  //     channel.on("MemberJoined", async (MemberId) => {
  //       console.log("a new member has joined the room : ", MemberId);
  //     });
  //   };
  //   init(roomId);
  // }, [roomId, currentUser]);

  useEffect(() => {
    console.log("starting point", roomId, client.uid);
    const init = async (roomName) => {
      console.log("init", roomName, client);
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success", user);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
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
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(config.appId, roomName, config.token, joinId);

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setlocalTrack(tracks);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(roomId);
    }
  }, [roomId, client, ready, tracks, localTrack]);

  console.log("my infomation", roomId, client);

  return (
    <VideoCallContainer>
      {ready && tracks && <Controls tracks={localTrack} setStart={setStart} />}
      {start && tracks && <Videos users={users} tracks={localTrack} />}
    </VideoCallContainer>
  );
}

export default VideoCall;
