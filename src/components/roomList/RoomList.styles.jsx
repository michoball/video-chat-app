import styled from "styled-components";
import { SpinnerContainer } from "../../UI/spinner/spinner.styles";

export const RoomContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: #313131;
  padding: 10px;
  margin: auto 0 10px;
  border: 1px solid #747474;
  border-radius: 10px;

  :hover {
    background-color: rgba(38, 38, 38, 0.7);
  }
  :last-child {
    margin-bottom: 0;
  }
`;

export const Name = styled.form`
  position: absolute;
  left: 20px;
  margin-top: -20px;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: white;
`;

export const EditName = styled.input`
  background-color: transparent;
  width: 100px;
  font-size: 16px;
  border: none;

  &.edit {
    background-color: rgba(116, 116, 116, 0.5);
    border-radius: 5px;
  }
`;

export const ClickSpot = styled.div`
  width: 100%;
  height: 60px;
  margin-left: 50px;
  cursor: pointer;
`;

export const SettingContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 25px;
    padding: 0;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
export const EditButton = styled.button`
  background-color: transparent;
  font-weight: bold;
  border: none;
  cursor: pointer;

  svg {
    fill: #3057f2;
    :hover {
      fill: #7d95f6;
    }
  }
`;

export const DeleteButton = styled.button`
  background-color: transparent;

  font-weight: bold;
  border: none;
  cursor: pointer;
  svg {
    fill: #f23030;

    :hover {
      fill: #e88383;
    }
  }
`;

export const RoomsInfo = styled.div`
  display: flex;

  align-items: center;
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 14px;
  gap: 5px;

  .userTotal {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const RoomNameListContainer = styled.div`
  ul {
    margin-left: 5px;
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
  }

  ul li {
    font-size: 10px;
    margin-right: 3px;
  }
`;

export const RoomListLoading = styled(SpinnerContainer)`
  width: 20px;
  height: 20px;
  border: 1px solid #fff;
  border-radius: 50%;
  border-top-color: #3958fc;
`;
