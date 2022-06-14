import styled from "styled-components";

export const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  min-width: 800px;
`;

export const VideoCallContainer = styled.section`
  display: flex;
  position: relative;
  flex: 0.8;
  padding: 20px;
`;

export const MessageCallContainer = styled.section`
  width: 100%;
  flex: 0.2;
  height: calc(100vh - 70px);
  min-width: 15rem;
  max-width: 20rem;
`;
