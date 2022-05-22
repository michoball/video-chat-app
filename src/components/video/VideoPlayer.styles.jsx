import styled from "styled-components";
import { AgoraVideoPlayer } from "agora-rtc-react";

export const VideoContainer = styled.div`
  position: relative;
`;

export const UserNameTag = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2px 5px;
  border-radius: 8px;
  bottom: 20px;
  right: 35px;
  color: white;
  letter-spacing: 0.3px;
  z-index: 5;
`;

export const Video = styled(AgoraVideoPlayer)`
  height: 250px;
  width: 300px;
  border: 4px solid #ab47bc;
  border-radius: 15%;
  overflow: hidden;
  margin: 10px 10px;
`;
