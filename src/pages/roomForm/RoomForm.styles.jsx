import styled from "styled-components";

export const RoomFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  h1 {
    color: #caab10;
    font-size: 50px;
    white-space: nowrap;
  }
`;

export const FormContainer = styled.form`
  background-color: #363739;
  width: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  margin: 30px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
  font-weight: bold;
`;
