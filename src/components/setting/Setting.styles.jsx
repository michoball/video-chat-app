import styled from "styled-components";
import { BsCircleFill } from "react-icons/bs";

export const SettingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  transition: all 1s ease;
  transform: translateX(10px);
  &.on {
    transform: rotateZ(-180deg);
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  opacity: 0;
  width: 0;
  align-items: center;
  transition: all 1s ease;
  gap: 10px;

  &.on {
    opacity: 1;
    width: 100px;
    transition: all 1s ease;
  }
`;

export const ColorCircle = styled(BsCircleFill)`
  font-size: 14px;

  align-items: center;
  fill: ${({ color }) => `${color}`};
`;
