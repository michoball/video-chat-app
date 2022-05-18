import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from "../utill/Agora.config";
import { useEffect, useState } from "react";
import Controls from "./videoControl/Controls";
import Videos from "./video/Videos";
import { useParams } from "react-router-dom";

function VideoCall() {
  const { roomId } = useParams();

  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      console.log("init", name);
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
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

      await client.join(config.appId, name, config.token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(roomId);
    }
  }, [roomId, client, ready, tracks]);

  return (
    <div className="App">
      {ready && tracks && <Controls tracks={tracks} setStart={setStart} />}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
}

export default VideoCall;
