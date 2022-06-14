import styled from "styled-components";
import { AgoraVideoPlayer } from "agora-rtc-react";

export const BaseVideoContainer = styled.div`
  position: relative;
  width: 350px;
  height: 250px;
  min-height: 200px;
  margin: 10px;
  border: 3px solid #a52aca;
  border-radius: 10%;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
  overflow: hidden;
  cursor: pointer;
`;

export const ShareVideoContainer = styled(BaseVideoContainer)`
  width: 700px;
  height: 550px;
`;

export const UserNameTag = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  z-index: 5;
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 8px;

  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  letter-spacing: 0.5px;
`;

export const LocalVideoContainer = styled(BaseVideoContainer)`
  width: 200px;
  height: 200px;
  min-height: 200px;
  border-radius: 50%;
  ${UserNameTag} {
    position: absolute;
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
  }
`;

export const SmallVideoContainer = styled(BaseVideoContainer)`
  width: 175px;
  height: 150px;
  min-height: 150px;
  border-radius: 30%;
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
