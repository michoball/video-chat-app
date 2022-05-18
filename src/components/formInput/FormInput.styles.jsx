import styled from "styled-components";

export const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const Input = styled.input`
  padding: 5px 20px;
  font-size: 20px;
  border: none;
  border-bottom: 3px solid gray;
  background-color: transparent;
  outline: none;
  color: white;
  ::placeholder {
    color: white;
  }
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-text-fill-color: #fff !important;
  }
`;

export const FromInputLabel = styled.label`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px0;
`;
