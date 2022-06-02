import styled from "styled-components";

export const MessageCallContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 70px);
  min-width: 20rem;
`;

export const MessageConainer = styled.div`
  background-color: #0b7922;
  overflow: scroll;
  overflow-x: hidden;
  min-height: 80vh;

  //스크롤 가리기
  /* ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  } */
`;

export const Header = styled.header`
  width: 100%;
  padding: 10px;
  color: white;
  background-color: #cb1616;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 20px;
  background-color: gray;
  z-index: 100;
`;

export const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;
