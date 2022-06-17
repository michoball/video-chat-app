import styled from "styled-components";
import { SpinnerContainer } from "../../UI/spinner/spinner.styles";

export const RoomContainer = styled.div`
  width: 450px;
  height: 80px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: #313131;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #747474;
  border-radius: 10px;

  :hover {
    background-color: rgba(38, 38, 38, 0.7);
  }
  :last-child {
    margin-bottom: 0;
  }
`;

export const RoomListLoading = styled(SpinnerContainer)`
  position: absolute;
  left: 210px;
  width: 35px;
  height: 35px;
  border: 1px solid #fff;
  border-radius: 50%;
  border-top-color: #3958fc;
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
  font-weight: bold;
  border: none;
  cursor: pointer;
  :hover {
    color: #e88383;
  }
`;

export const RoomsInfo = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 12px;
  gap: 5px;

  .userTotal {
    display: flex;
    gap: 5px;
    margin-right: 5px;
  }

  .liveUser {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;
