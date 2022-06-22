import styled from "styled-components";

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
  min-width: 220px;
  max-width: 250px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
