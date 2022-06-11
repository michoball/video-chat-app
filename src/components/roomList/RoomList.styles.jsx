import styled from "styled-components";

export const RoomContainer = styled.div`
  width: 450px;
  height: 80px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: #4b4952;
  padding: 10px;
  margin-bottom: 10px;
  border: 3px solid #f2cb05;
  border-radius: 10px;

  :hover {
    background-color: rgba(51, 50, 46, 0.6);
  }
  :last-child {
    margin-bottom: 0;
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
  font-weight: bold;
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
