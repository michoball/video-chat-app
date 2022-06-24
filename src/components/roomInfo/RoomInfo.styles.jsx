import styled from "styled-components";

export const RoomInfoContainer = styled.section`
  margin: 10px auto;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 250px;
  background-color: #747474;
  border: 1px solid #3958fc;
  border-radius: 5%;
  overflow: hidden;

  transition: width 0.3s ease-in-out;

  @media screen and (max-width: 1024px) {
    width: 150px;
    margin-top: 50px;
  }
`;

export const RoomNameHeader = styled.header`
  background-color: #494949;
  border-bottom: 2px solid ${(props) => props.theme.lineColor};

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
  height: 40px;
  background-color: #494949;
  padding: 5px 10px;
  text-align: center;
  border-top: 2px solid ${(props) => props.theme.lineColor};
`;
