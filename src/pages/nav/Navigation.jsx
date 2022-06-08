import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  NavContainer,
  NavLink,
  LogOutContainer,
  NavSpinner,
} from "./Navigation.styles";
import { signOutUser } from "../../utill/firebase/firebase.auth";
import { UserContext } from "../../context/userContext";

function Navigation() {
  const { currentUser, isLoading } = useContext(UserContext);

  if (isLoading) {
    return (
      <Fragment>
        <NavContainer>
          <Link to="/">
            <h1>Chat Room</h1>
          </Link>
          <NavSpinner />
        </NavContainer>
        <Outlet />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <NavContainer>
        <Link to="/">
          <h1>Chat Room</h1>
        </Link>
        {currentUser ? (
          <LogOutContainer>
            <span>{currentUser.displayName}</span>
            <NavLink as="span" onClick={signOutUser}>
              Log Out
            </NavLink>
          </LogOutContainer>
        ) : (
          <NavLink to="/sign-in">Log In First</NavLink>
        )}
      </NavContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
