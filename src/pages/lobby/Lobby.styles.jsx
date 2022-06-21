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
  h2 {
    text-transform: uppercase;
    /* text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.6); */
  }
`;

export const RoomListContainer = styled.div`
  width: 500px;
  height: 400px;
  background-color: #151515;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
  margin: 10px auto 20px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.lineColor};
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
  width: 150px;
  background-color: #313131 !important;
  border: 1px solid #747474;
  color: #a52aca !important;
  text-transform: uppercase;
  &.join {
    color: #3bd923 !important;
  }

  :hover {
    background-color: rgba(38, 38, 38, 0.7) !important;
  }
`;
