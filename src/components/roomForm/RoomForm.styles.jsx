import styled from "styled-components";
import { SpinnerContainer } from "../../UI/spinner/spinner.styles";
import { CustomForm } from "../../UI/formContainer/FormContainer.styles";
import FormInput from "../../UI/formInput/FormInput";
import Button from "../../UI/button/Button";

export const Backdrop = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const RoomContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  justify-content: center;
  align-items: center;
  h3 {
    text-transform: uppercase;
    color: #fff;
    font-size: 40px;
    margin-bottom: 20px;
    white-space: nowrap;
  }
  z-index: 200;
`;

export const RoomFormContainer = styled(CustomForm)`
  justify-content: space-between;
  width: 400px;
  height: 250px;
  border: 1px solid ${({ color }) => `${color}`};

  p {
    text-align: center;
    font-size: 30px;
  }
`;

export const RoomFormInput = styled(FormInput)`
  text-align: center;
  height: 50px;
  ::placeholder {
    text-align: center;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 1rem;
`;

export const RoomFormBtn = styled(Button)`
  background-color: #3958fc !important;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  box-shadow: unset;
  &.cancel {
    background-color: #f23030 !important;
    :hover {
      background-color: rgba(242, 48, 48, 0.7) !important;
    }
  }
  :hover {
    background-color: rgba(57, 88, 252, 0.7) !important;
  }
`;

export const FormSpinner = styled(SpinnerContainer)`
  width: 25px;
  height: 25px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: #a52aca;
`;
