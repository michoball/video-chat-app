import { useClient } from "../../utill/Agora.config";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControlsContainer, ButtonBox } from "./Controls.styles";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import { RtcContext } from "../../context/rtcContext";

const Controls = (props) => {
  const client = useClient();
  const navigate = useNavigate();
  const { toggleStart, clearRtcUser, toggleShare, share } =
    useContext(RtcContext);
  const { tracks } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [isLoading, setIsLoading] = useState(false);

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      setIsLoading(true);
      try {
        await tracks[1].setEnabled(!trackState.video);

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
    tracks[0].close();
    tracks[1].close();
    await client.leave();
    client.removeAllListeners();
    clearRtcUser();
    toggleStart(false);
    navigate("/room");
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
          <div>isLoading...</div>
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
