import styled from "styled-components";
import { Link } from "react-router-dom";
import { SpinnerContainer } from "../../UI/spinner/spinner.styles";
import { GiHamburgerMenu } from "react-icons/gi";

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: #262626;
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
  padding: 15px 30px;
  h1 {
    color: #d0d2d7;
    text-transform: uppercase;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);

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

    color: ${(props) => props.theme.lineColor};
    padding-right: 10px;
  }
`;

export const NavLink = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  color: #d0d2d7 !important;
  cursor: pointer;
`;

export const NavSpinner = styled(SpinnerContainer)`
  width: 25px;
  height: 25px;
  border: 1px solid #fff;
  border-radius: 50%;
  border-top-color: #3958fc;
`;

export const HambergerMenu = styled(GiHamburgerMenu)`
  display: none;
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    display: block;
  }
`;
