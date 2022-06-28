import styled from "styled-components";
import { FaRegCopy } from "react-icons/fa";

export const RoomInfoContainer = styled.section`
  position: relative;
  margin: 10px auto;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 250px;
  background-color: #747474;
  border: 2px solid #3958fc;
  border-radius: 10px;

  transition: width 0.3s ease-in-out;

  @media screen and (max-width: 1024px) {
    width: 150px;
    margin-top: 50px;
  }
`;

export const RoomNameHeader = styled.header`
  position: relative;
  background-color: #494949;
  border-bottom: 2px solid ${(props) => props.theme.lineColor};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 10px;
  text-align: center;
  height: 50px;
`;

export const RoomUserList = styled.div`
  height: 160px;
  background-color: #1b1b1b;
  padding: 15px 0;
  ul {
    list-style: none;
  }
`;

export const RoomSettings = styled.div`
  display: flex;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 40px;
  background-color: #494949;
  padding: auto 10px;
  text-align: center;
  border-top: 2px solid ${(props) => props.theme.lineColor};
`;

export const RoomIdCopy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10%;
  left: 90%;
  width: 100px;
  font-size: 16px;
  color: white;

  animation: 0.3s linear popupIcon, 0.5s linear 1.5s reverse popupIcon;

  svg {
    font-size: 18px;
    margin-right: 5px;
  }

  @keyframes popupIcon {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const CopyIcon = styled(FaRegCopy)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px;
  color: white;

  cursor: pointer;
`;
