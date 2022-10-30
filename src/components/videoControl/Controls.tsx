import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearRtcUser, toggleShare } from "../../store/rtc/rtc.action";
import {
  selectRtcLocalUser,
  selectRtcShare,
  selectRtcUsers,
} from "../../store/rtc/rtc.selector";
import { useDispatch, useSelector } from "react-redux";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";

import { ControlsContainer, ButtonBox, ButtonSpinner } from "./Controls.styles";
import {
  selectRtmChannel,
  selectRtmClient,
} from "../../store/rtm/rtm.selector";
import { clearRtm } from "../../store/rtm/rtm.action";

const Controls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localUser = useSelector(selectRtcLocalUser);
  const rtcUsers = useSelector(selectRtcUsers);
  const share = useSelector(selectRtcShare);
  const channel = useSelector(selectRtmChannel);
  const rtmClient = useSelector(selectRtmClient);

  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [isLoading, setIsLoading] = useState(false);

  const mute = async (type: string) => {
    if (!localUser) return;

    if (type === "audio") {
      await localUser.tracks[1].setMuted(trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      setIsLoading(true);
      try {
        await localUser.tracks[0].setMuted(trackState.video);

        setTrackState((ps) => {
          return { ...ps, video: !ps.video };
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const leaveChannel = async () => {
    if (!localUser) return;

    localUser.tracks[0].close();
    localUser.tracks[1].close();
    await localUser.user.leave();
    localUser.user.removeAllListeners();

    if (!channel || !rtmClient) return;
    await channel.leave();
    await rtmClient.logout();
    navigate("/lobby");

    dispatch(clearRtm());
    dispatch(clearRtcUser());
  };

  const shareHandler = () => {
    dispatch(toggleShare(rtcUsers, !share));
  };

  return (
    <ControlsContainer>
      <ButtonBox
        className={trackState.audio ? "on" : ""}
        onClick={() => mute("audio")}
      >
        {trackState.audio ? <MicIcon /> : <MicOffIcon />}
      </ButtonBox>
      <ButtonBox
        className={trackState.video ? "on" : ""}
        onClick={() => mute("video")}
      >
        {isLoading ? (
          <ButtonSpinner />
        ) : (
          <div>{trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}</div>
        )}
      </ButtonBox>
      <ButtonBox onClick={() => shareHandler()}>
        <PersonalVideoIcon />
      </ButtonBox>
      <ButtonBox onClick={() => leaveChannel()}>
        <ExitToAppIcon />
      </ButtonBox>
    </ControlsContainer>
  );
};

export default Controls;
