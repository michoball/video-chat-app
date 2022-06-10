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
`;

export const RoomListContainer = styled.div`
  width: 500px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
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

export const RoomContainer = styled.div`
  width: 450px;
  height: 80px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: #33322e;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #f2cb05;
  border-radius: 10px;

  :hover {
    background-color: rgba(51, 50, 46, 0.6);
  }
`;

export const Name = styled.h3`
  position: absolute;
  left: 20px;
  margin-top: -20px;
  font-size: 20px;
  letter-spacing: 0.5px;

  a {
    color: white;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  color: #f23030;
  border: none;
  cursor: pointer;
  :hover {
    color: #e88383;
  }
`;

export const RoomInfo = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 12px;
  gap: 5px;
`;

export const AddRoomBtn = styled(Button)`
  background-color: #a52aca;
`;
