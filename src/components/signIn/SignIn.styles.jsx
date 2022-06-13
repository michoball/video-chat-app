import styled from "styled-components";

export const SignUpContainer = styled.div`
  width: 60%;
  min-width: 400px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: white;
    font-size: 40px;
    margin-bottom: 10px;
    white-space: nowrap;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 5px 5px 0;
  gap: 10px;
  span {
    width: 150px;
    font-weight: bold;
    font-size: 12px;
  }
`;

export const ToggleSignUp = styled.p`
  font-size: 16px;
  color: #d0d2d7;
  padding: 20px 0;
  cursor: pointer;
`;
