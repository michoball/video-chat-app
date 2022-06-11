import { useContext, useEffect, useState, Fragment } from "react";
import { useClient } from "../../utill/Agora.config";
import Controls from "../../components/videoControl/Controls";
import Videos from "../../components/videos/Videos";
import { RtcContext } from "../../context/rtcContext";
import Spinner from "../../UI/spinner/spinner";

function VideoCall() {
  const [isLoading, setIsLoading] = useState(true);
  const [start, setStart] = useState(false);

  const client = useClient();
  const { addRtcUser, removeRtcUser, localUser } = useContext(RtcContext);

  useEffect(() => {
    const init = async () => {
      // remote user가 들어오고 나가고 할 때 event handler
      client.on("user-published", async (user, mediaType) => {
        console.log("user-published");
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

      setStart(true);
      setIsLoading(false);
    };

    if (localUser) {
      console.log("VideoCall point", localUser, client);
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser, client]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      {localUser.tracks && <Controls />}
      {start && localUser.tracks && <Videos />}
    </Fragment>
  );
}

export default VideoCall;
