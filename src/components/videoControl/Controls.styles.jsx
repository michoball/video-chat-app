import styled from "styled-components";

export const ControlsContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  gap: 1rem;
  transform: translateX(-50%);
  z-index: 10;
`;

export const ButtonBox = styled.button`
  cursor: pointer;
  background-color: #262625;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  svg {
    font-size: 2rem !important;
  }

  &.on {
    background-color: #ab47bc;
  }
`;
