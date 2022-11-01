import styled from "styled-components";

export const BaseButton = styled.button`
  width: 250px;
  height: 40px;

  background-color: #262625;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  color: whitesmoke;
  border: 1px solid #747474;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;

  cursor: pointer;

  svg {
    font-size: 1.25rem;
  }
`;
