import { useEffect, useState, Fragment } from "react";
import { useClient } from "../../utill/Agora.config";
import Controls from "../videoControl/Controls";
import Videos from "../videos/Videos";

import Spinner from "../../UI/spinner/spinner";

import { addRtcUser, removeRtcUser } from "../../store/rtc/rtc.action";
import { useDispatch, useSelector } from "react-redux";
import { selectRtcLocalUser } from "../../store/rtc/rtc.selector";

function VideoCall() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [start, setStart] = useState(false);
  const localUser = useSelector(selectRtcLocalUser);
  const client = useClient();

  useEffect(() => {
    const init = async () => {
      // remote user가 들어오고 나가고 할 때 event handler
      client.on("user-published", async (user, mediaType) => {
        try {
          await client.subscribe(user, mediaType);

          if (mediaType === "video") {
            console.log("new published User : ", user);

            dispatch(addRtcUser(user));
          }
          if (mediaType === "audio") {
            user.audioTrack?.play();
          }

          console.log("subscribe success", user, "client", client);
        } catch (error) {
          console.log("rtc subscribe fail", error);
        }
      });

      client.on("user-unpublished", async (user, mediaType) => {
        try {
          await client.unsubscribe(user, mediaType);
          console.log("unpublished", user, mediaType);
        } catch (error) {
          console.log("rtc unpublished error", error);
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        dispatch(removeRtcUser(user));
      });

      setStart(true);
      setIsLoading(false);
    };

    if (localUser) {
      console.log("VideoCall point", localUser);
    }
    // localUser가 들어오기 전에 이미 존재하는 유저를 구독해야 하기 때문에
    init();
  }, [localUser, client, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      {localUser && localUser.tracks && <Controls />}
      {start && localUser && localUser.tracks && <Videos />}
    </Fragment>
  );
}

export default VideoCall;
