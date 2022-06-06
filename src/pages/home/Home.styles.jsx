import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  flex-direction: column;
  align-items: center;
  color: whitesmoke;
`;

export const IconContainer = styled.div`
  position: relative;
  width: 350px;
  height: 250px;
  border-radius: 30px;
  background-color: #5a6063;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
  z-index: -1;
  margin: 120px auto 0;
`;

export const HomeHeader = styled.h1`
  font-size: 60px;
  padding: 30px 0;
`;

export const ButtonContainer = styled.div`
  span {
    font-size: 10px;
  }
`;
