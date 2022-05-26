import styled from "styled-components";
import { AgoraVideoPlayer } from "agora-rtc-react";

export const VideoContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  margin: 10px;
  border: 5px solid #045204;
  border-radius: 10%;
  overflow: hidden;

  &.big {
    width: 70%;
    height: 75vh;
  }
`;

export const UserNameTag = styled.div`
  position: absolute;
  bottom: 20px;
  right: 35px;
  z-index: 5;
  padding: 2px 15px;
  border-radius: 8px;
  background-color: rgb(0, 0, 0);
  color: white;
  letter-spacing: 1px;
`;

export const Video = styled(AgoraVideoPlayer)`
  height: 100% !important;
  width: 100% !important;
`;
