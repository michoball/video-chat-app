import styled from "styled-components";

export const RoomFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  h1 {
    color: #f29f05;
    font-size: 50px;
    white-space: nowrap;
  }
`;

export const FormContainer = styled.form`
  background-color: rgb(99, 99, 99);
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
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
