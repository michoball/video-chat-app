import styled from "styled-components";
import Button from "../../UI/button/Button";

export const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  width: 100%;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  h1 {
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.6);
  }
`;

export const RoomListContainer = styled.div`
  width: 500px;
  height: 400px;
  background-color: #161616;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  margin: 20px auto;
  padding: 20px;
  border: 5px solid #1d594e;
  border-radius: 20px;
  overflow: scroll;

  //스크롤 가리기
  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const AddRoomBtn = styled(Button)`
  background-color: #a52aca !important;
`;
