import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
  height: 70px;
  width: 100%;
  background-color: #034a03;
  padding: 15px 20px;
  h1 {
    color: #caab10;
    margin: 0 20px;
  }
`;

export const NavLink = styled(Link)`
  font-size: large;
  font-weight: bold;
  color: yellow;
  cursor: pointer;
`;
