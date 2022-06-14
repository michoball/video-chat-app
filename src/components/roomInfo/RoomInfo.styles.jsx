import styled from "styled-components";

export const RoomInfoContainer = styled.section`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 250px;
  /* min-height: 300px; */
  background-color: #747474;
  border: 1px solid #3958fc;
  border-radius: 5%;
  overflow: hidden;
`;

export const RoomNameHeader = styled.header`
  background-color: #494949;
  border-bottom: 2px solid #a52aca;

  padding: 10px;
  text-align: center;
  flex: 0.1;
`;

export const RoomUserList = styled.div`
  flex: 0.8;
  background-color: #1b1b1b;
  padding: 10px 20px;

  ul {
    list-style: none;
  }
`;

export const RoomSettings = styled.div`
  flex: 0.1;
  height: 30px;
  background-color: #494949;
  padding: 5px;
  text-align: center;
  border-top: 2px solid #a52aca;
`;
