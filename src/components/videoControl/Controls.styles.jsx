import styled from "styled-components";
import { SpinnerContainer } from "../../UI/spinner/spinner.styles";
import Button from "../../UI/button/Button";

export const ControlsContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  gap: 1rem;
  transform: translateX(-50%);
  z-index: 10;
`;

export const ButtonBox = styled(Button)`
  transition: all 0.2s ease-in-out;

  &.on {
    background-color: #f23030;
  }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
  width: 1.5rem;
  height: 1.5rem;
`;
