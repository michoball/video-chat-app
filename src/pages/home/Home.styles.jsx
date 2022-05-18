import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  flex-direction: column;
  align-items: center;
  color: white;
`;

export const IconContainer = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background-color: #2a2b2d;
  z-index: -1;
  margin: 120px auto 0;
`;

export const HomeHeader = styled.h1`
  font-size: 70px;
  padding: 30px 0;
`;

export const CamIcon = styled(CameraEnhanceIcon)`
  position: absolute;
  color: #caab10;
  opacity: 0.7;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px !important;
  height: 300px !important;
`;

export const ButtonContainer = styled.div``;
