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
  width: 200px;
  height: 200px;
  border-radius: 50%;
  align-items: center;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
  margin: 100px auto 0;
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
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
