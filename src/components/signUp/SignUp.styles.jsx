import styled from "styled-components";

export const SignUpContainer = styled.div`
  width: 70%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: white;
    font-size: 50px;
    margin-bottom: 40px;
  }
`;

export const FormContainer = styled.form`
  background-color: #363739;
  width: 100%;
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  padding: 20px;
  margin: 0 20px;
`;

export const ToggleSignUp = styled.p`
  font-size: 18px;
  color: #caab10;
  padding: 20px 0;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 5px 5px 0;

  span {
    width: 200px;
    font-weight: bold;
  }
`;
