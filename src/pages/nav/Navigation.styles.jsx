import styled from "styled-components";
import { Link } from "react-router-dom";
import { SpinnerContainer } from "../../UI/spinner/spinner.styles";

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: #1d594e;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
  padding: 15px 20px;
  h1 {
    color: #f29f05;
    margin: 0 20px;
  }
`;
export const LogOutContainer = styled.div`
  color: whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 14px;
    font-weight: bold;
    padding-right: 10px;
  }
`;

export const NavLink = styled(Link)`
  font-size: 14px;
  font-weight: bold;
  color: #f29f05;
  cursor: pointer;
`;

export const NavSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
  border: 2px solid whitesmoke;
  border-top-color: #f2cb05;
`;
