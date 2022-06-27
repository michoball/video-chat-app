import styled from "styled-components";
import { RiMessage3Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

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

  height: calc(100vh - 60px);
  min-width: 200px;
  max-width: 300px;
  z-index: 5;
  transition: max-width 0.5s ease;

  &.show {
    animation: showContainer 1s forwards ease-in-out;
  }
  &.hide {
    animation: hideContainer 1s forwards ease-out;
  }

  @media screen and (max-width: 1400px) {
    max-width: 230px;
  }

  @media screen and (max-width: 1000px) {
    max-width: 180px;
  }

  @keyframes showContainer {
    0% {
      transform: translateX(100%) scaleX(0);
    }

    66% {
      transform: translateX(-20px) scaleX(1.1);
    }
    100% {
      transform: translateX(0) scaleX(1);
    }
  }

  @keyframes hideContainer {
    0% {
      transform: translateX(0) scaleX(1);
    }
    33% {
      transform: translateX(-20px) scaleX(1.1);
    }

    100% {
      transform: translateX(100%) scaleX(0);
      width: 0%;
    }
  }
`;

export const MessageIcon = styled(RiMessage3Line)`
  position: absolute;
  bottom: 10px;
  right: 30px;
  width: 40px;
  height: 40px;

  cursor: pointer;

  @media screen and (max-width: 800px) {
    width: 30px;
    height: 30px;
  }
`;
export const ToggleCollapse = styled(IoIosArrowForward)`
  position: absolute;
  left: 0px;
  bottom: 0;
  width: 20px;
  height: 60px;
  border-right: 1px solid #fff;
  background-color: #262625;
  z-index: 10;
  cursor: pointer;

  @media screen and (min-width: 1200px) {
    animation: hideToggle 0.5s forwards;
  }

  @media screen and (max-width: 1200px) {
    animation: showToggle 0.5s forwards;
  }
  @media screen and (max-width: 1000px) {
    /* visibility: hidden; */
  }

  @keyframes showToggle {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(2px);
    }
  }
  @keyframes hideToggle {
    0% {
      transform: translateX(2px);
      opacity: 1;
    }

    99% {
      transform: translateX(-20px);
      opacity: 0;
    }
    100% {
      transform: scale(0);
    }
  }
`;
