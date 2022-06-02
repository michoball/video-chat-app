import styled from "styled-components";
import { AgoraVideoPlayer } from "agora-rtc-react";

export const BaseVideoContainer = styled.div`
  position: relative;
  width: 500px;
  height: 400px;
  margin: 10px;
  border: 5px solid #045204;
  border-radius: 10%;
  overflow: hidden;
  z-index: 4;
  cursor: pointer;
`;

export const ShareVideoContainer = styled(BaseVideoContainer)`
  width: 1080px;
  height: 700px;
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

export const LocalVideoContainer = styled(BaseVideoContainer)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  ${UserNameTag} {
    position: absolute;
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
  }
`;

export const SmallVideoContainer = styled(BaseVideoContainer)`
  width: 250px;
  height: 200px;
  border-radius: 40%;
  ${UserNameTag} {
    position: absolute;
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
  }
`;

export const Video = styled(AgoraVideoPlayer)`
  height: 100% !important;
  width: 100% !important;
`;
