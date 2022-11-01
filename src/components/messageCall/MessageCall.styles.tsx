import styled from "styled-components";
import Button from "../../UI/button/Button";

export const MessageCallContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
  border-left: 2px solid ${(props) => props.theme.lineColor};
  @media screen and (max-width: 1200px) {
    border-left: none;
  }
`;

export const MessageConainer = styled.div`
  overflow: scroll;
  height: calc(100% - 110px);
  background-color: transparent;

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
  height: 50px;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #d0d2d7;
  text-align: center;
  border-bottom: 2px solid #747474;
  background-color: #494949;
  transition: all 0.3s ease;

  @media screen and (max-width: 1200px) {
    transition: all 0.3s ease;
    transform: translateY(-50%);
    opacity: 0;
    visibility: hidden;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 60px;
  padding: 10px 20px;
  border-top: 2px solid #747474;
  background-color: #494949;

  @media screen and (max-width: 1200px) {
    border-left: 2px solid ${(props) => props.theme.lineColor};
  }
`;

export const SendButton = styled(Button)`
  position: absolute;
  right: 10px;
  width: 35px;
  height: 30px;
  border-color: ${(props) => props.theme.lineColor} !important;
  svg {
    font-size: 0.5rem;
  }
`;

export const MessageFormInput = styled.textarea`
  font-size: 12px;
  margin-left: 5px;
  width: calc(100% - 40px);
  resize: none;
  border: none;
  border-bottom: 2px solid #fff;
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
