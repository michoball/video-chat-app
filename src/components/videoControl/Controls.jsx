import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControlsContainer, ButtonBox, ButtonSpinner } from "./Controls.styles";
import { RtcContext } from "../../context/rtcContext";
import { RtmContext } from "../../context/rtmContext";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";

const Controls = () => {
  const navigate = useNavigate();
  const { clearRtcUser, toggleShare, share, localUser } =
    useContext(RtcContext);
  const { channel, rtmClient, clearClientAndChannel, clearMessages } =
    useContext(RtmContext);
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [isLoading, setIsLoading] = useState(false);
  console.log("control~~~~~  created~~~~~~~~");
  const mute = async (type) => {
    if (type === "audio") {
      await localUser.tracks[1].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      setIsLoading(true);
      try {
        await localUser.tracks[0].setEnabled(!trackState.video);

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
    localUser.tracks[0].close();
    localUser.tracks[1].close();
    await localUser.user.leave();
    localUser.user.removeAllListeners();
    await channel.leave();
    await rtmClient.logout();
    navigate("/lobby");

    clearClientAndChannel();
    clearMessages();
    clearRtcUser();
  };

  const shareHandler = () => {
    toggleShare(!share);
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
