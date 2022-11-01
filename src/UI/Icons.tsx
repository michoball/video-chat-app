import styled from "styled-components";

import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

export const CamIcon = styled(CameraEnhanceIcon)`
  position: absolute;
  color: #f29f05;
  opacity: 0.7;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px !important;
  height: 200px !important;
`;

export const SendingIcon = styled(SendOutlinedIcon)`
  color: whitesmoke;
  width: 20px !important;
  height: 20px !important;
`;
