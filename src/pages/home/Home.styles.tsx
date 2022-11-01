import styled from "styled-components";
import Button from "../../UI/button/Button";

export const HomeContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 70px);
  color: whitesmoke;
`;

export const HomeForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 500px;
  border-radius: 5%;
  background-color: #262626;
  border: 1px solid ${(props) => props.theme.lineColor};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
`;

export const IconContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  align-items: center;
  border: 2px solid #d0d2d7;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
`;

type BackgroundImageProps = {
  imageUrl?: string;
};

export const BackgroundImage = styled.div<BackgroundImageProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const HomeHeader = styled.h1`
  font-size: 60px;
  padding: 10px 0;
  margin: 10px;
  color: #d0d2d7;
  white-space: nowrap;
  z-index: 100;
  text-shadow: 5px 5px 15px rgba(0, 0, 0, 0.7);
`;

export const HomeButton = styled(Button)`
  background-color: #3958fc;
  /* border-color: #d0d2d7; */
  color: #d0d2d7;
`;
