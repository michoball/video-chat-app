import { useClient } from "../../utill/Agora.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControlsContainer, ButtonBox } from "./Controls.styles";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";

const Controls = (props) => {
  const client = useClient();
  const navigate = useNavigate();
  const { tracks, setStart } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    navigate("/room");
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
        {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
      </ButtonBox>
      <ButtonBox onClick={() => {}}>
        <PersonalVideoIcon />
      </ButtonBox>
      <ButtonBox onClick={() => leaveChannel()}>
        <ExitToAppIcon />
      </ButtonBox>
    </ControlsContainer>
  );
};

export default Controls;
