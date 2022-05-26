import styled from "styled-components";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import { AgoraVideoPlayer } from "agora-rtc-react";

export const ShareScreenContainer = styled.div`
  display: flex;
  height: 70vh;
  justify-content: center;
  overflow: hidden;
`;
export const ShareVideoContainer = styled.div`
  border: 5px solid #045204;
  border-radius: 10px;
  width: 70% !important;
  height: 100% !important;
`;

export const Video = styled(AgoraVideoPlayer)`
  height: 100%;
  width: 100%;
`;

export const CamIcon = styled(CameraEnhanceIcon)`
  position: absolute;
  color: #caab10;
  opacity: 0.7;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px !important;
  height: 300px !important;
`;
