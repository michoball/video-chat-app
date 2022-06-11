import styled from "styled-components";
import Button from "../../UI/button/Button";

export const MessageCallContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
  border-left: 3px solid #1d594e;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: -5px 10px 10px rgba(0, 0, 0, 0.3);
`;

export const MessageConainer = styled.div`
  overflow: scroll;
  height: 82%;
  background-color: #161616;

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
  color: white;
  text-align: center;
  border-bottom: 3px solid black;
  background-color: #262625;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  padding: 10px 20px;
  border-top: 3px solid black;
  background-color: #262625;
`;

export const SendButton = styled(Button)`
  width: 40px;
  height: 30px;
  background-color: #f28705 !important;
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
