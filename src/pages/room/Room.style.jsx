import styled from "styled-components";
import { RiMessage3Line } from "react-icons/ri";

export const RoomContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
`;

export const VideoCallContainer = styled.section`
  display: flex;
  position: relative;
  padding: 20px;
  width: 100%;
`;

export const MessageCallContainer = styled.section`
  position: absolute;
  right: 0;
  width: 100%;

  height: calc(100vh - 70px);
  min-width: 200px;
  max-width: 300px;

  transition: max-width 0.5s ease;

  @media screen and (max-width: 1400px) {
    max-width: 230px;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const MessageIcon = styled(RiMessage3Line)`
  position: absolute;
  bottom: 10px;
  right: 30px;
  width: 40px;
  height: 40px;
  display: none;
  cursor: pointer;

  @media screen and (max-width: 1000px) {
    display: block;
  }
  @media screen and (max-width: 800px) {
    display: block;
    width: 30px;
    height: 30px;
  }
`;
