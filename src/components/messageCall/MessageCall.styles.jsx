import styled from "styled-components";
import Button from "../../UI/button/Button";

export const MessageCallContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
  border-left: 1px solid #3958fc;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: -5px 10px 10px rgba(0, 0, 0, 0.3);
`;

export const MessageConainer = styled.div`
  overflow: scroll;
  height: 82%;
  background-color: #1b1b1b;

  //스크롤 가리기
  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const EndOfMessage = styled.div`
  height: 20px;
  margin-bottom: 50px;
`;

export const Header = styled.header`
  width: 100%;
  height: 8%;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #d0d2d7;
  text-align: center;
  border-bottom: 2px solid #a52aca;
  background-color: #262626;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  padding: 10px 20px;
  border-top: 2px solid #a52aca;
  background-color: #262626;
`;

export const SendButton = styled(Button)`
  width: 40px;
  height: 30px;
  border-color: #a52aca !important;
  svg {
    font-size: 0.5rem;
  }
`;

export const MessageFormInput = styled.textarea`
  display: block;
  font-size: 12px;
  margin-right: 10px;
  width: 100%;
  resize: none;
  border: none;
  border-bottom: 3px solid gray;
  background-color: transparent;
  outline: none;
  color: white;

  //스크롤 가리기
  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
