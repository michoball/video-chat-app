import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeContainer,
  IconContainer,
  HomeHeader,
  BackgroundImage,
  HomeButton,
  HomeForm,
} from "./Home.styles";
import Ci from "../../asset/videoChatIcon-96x96.png";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectRtcLocalUser } from "../../store/rtc/rtc.selector";
import { clearRtcUser } from "../../store/rtc/rtc.action";
import { clearRtm } from "../../store/rtm/rtm.action";

import {
  selectRtmChannel,
  selectRtmClient,
} from "../../store/rtm/rtm.selector";
import { checkUserSession } from "../../store/user/user.action";

function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const localUser = useSelector(selectRtcLocalUser);

  const rtmClient = useSelector(selectRtmClient);
  const channel = useSelector(selectRtmChannel);
  const navigate = useNavigate();

  // rtc와 rtm에 유저가 남아있을시 유저 세션 종료 및 정보 삭제
  useEffect(() => {
    const checkLocalUserSession = async () => {
      if (localUser && localUser.user) {
        localUser.tracks[0].close();
        localUser.tracks[1].close();
        await localUser.user.leave();
        localUser.user.removeAllListeners();
        dispatch(clearRtcUser());
      }
      if ((rtmClient && channel) !== null) {
        await channel.leave();
        await rtmClient.logout();
        dispatch(clearRtm());
      }
    };
    checkLocalUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(checkUserSession());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeContainer>
      <HomeForm>
        <IconContainer>
          <BackgroundImage imageUrl={Ci} />
        </IconContainer>
        <HomeHeader> Video Chat Room</HomeHeader>

        {currentUser ? (
          <HomeButton type="submit" onClick={() => navigate("/lobby")}>
            START
          </HomeButton>
        ) : (
          <HomeButton type="submit" onClick={() => navigate("/auth")}>
            LOG IN
          </HomeButton>
        )}
      </HomeForm>
    </HomeContainer>
  );
}

export default Home;
