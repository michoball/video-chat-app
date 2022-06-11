import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

import {
  HomeContainer,
  IconContainer,
  HomeHeader,
  BackgroundImage,
  HomeButton,
} from "./Home.styles";
import Ci from "../../asset/videoChatIcon-96x96.png";

import { RtcContext } from "../../context/rtcContext";
import { RtmContext } from "../../context/rtmContext";

function Home() {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  if (currentUser) {
    console.log(currentUser);
  }

  const { clearRtcUser, localUser } = useContext(RtcContext);
  const { channel, rtmClient, clearClientAndChannel, clearMessages } =
    useContext(RtmContext);

  useEffect(() => {
    const checkLocalUserSession = async () => {
      if (localUser.user) {
        localUser.tracks[0].close();
        localUser.tracks[1].close();
        await localUser.user.leave();
        localUser.user.removeAllListeners();
        clearRtcUser();
      }
      if ((rtmClient && channel) !== null) {
        await channel.leave();
        await rtmClient.logout();
        clearClientAndChannel();
        clearMessages();
      }
    };
    checkLocalUserSession();
  }, []);

  return (
    <HomeContainer>
      <IconContainer>
        <BackgroundImage imageUrl={Ci} />
      </IconContainer>
      <HomeHeader> Video Chat Room</HomeHeader>

      {currentUser ? (
        <HomeButton type="submit" onClick={() => navigate("/lobby")}>
          START
        </HomeButton>
      ) : (
        <HomeButton type="submit" onClick={() => navigate("/sign-in")}>
          LOG IN
        </HomeButton>
      )}
    </HomeContainer>
  );
}

export default Home;
