import styled from "styled-components";

export const BaseButton = styled.button`
  cursor: pointer;

  background-color: #262625;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  color: whitesmoke;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;

  svg {
    font-size: 1.25rem;
  }
`;
