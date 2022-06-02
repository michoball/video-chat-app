import styled from "styled-components";

export const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  min-width: 1200px;
`;

export const VideoCallContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex: 0.75;
  padding: 20px;
  background-color: #6a6a08;
`;

export const MessageCallContainer = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  flex: 0.25;
  background-color: #083b6a;
`;
