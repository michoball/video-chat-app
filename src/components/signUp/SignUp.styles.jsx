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
    font-size: 50px;
    margin-bottom: 30px;
    white-space: nowrap;
  }
`;

export const ToggleSignUp = styled.p`
  font-size: 16px;
  color: #f2cb05;
  padding: 20px 0;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 5px 5px 0;

  span {
    width: 150px;
    font-weight: bold;
    font-size: 12px;
  }
`;
