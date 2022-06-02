import styled from "styled-components";
import FormInput from "../../components/formInput/FormInput";

export const MessageCallContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 70px);
  border-left: 3px solid #033a03;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: -5px 10px 10px rgba(0, 0, 0, 0.3);
  /* background-color: black; */
`;

export const MessageConainer = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  flex: 0.85;
  background-color: #161616;

  //스크롤 가리기
  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const Header = styled.header`
  width: 100%;
  flex: 0.05;
  padding: 10px;
  color: white;
  text-align: center;
  border-bottom: 3px solid black;
  background-color: #1d1e1d;
`;

export const FormContainer = styled.div`
  display: flex;
  flex: 0.1;
  align-items: center;
  height: 100%;
  padding: 5px 20px;
  border-top: 3px solid black;
  background-color: #1d1e1d;
  z-index: 100;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
  padding-top: 10px;
`;

export const EndOfMessage = styled.div`
  margin-top: 50px;
`;

export const MessageFormInput = styled.textarea`
  margin: 0;
  min-height: 50px;
  width: 100%;
  padding-bottom: -10px;
  font-size: 20px;

  border: none;
  border-bottom: 3px solid gray;
  background-color: transparent;
  outline: none;
  color: white;
`;
