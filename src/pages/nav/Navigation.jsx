import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { NavContainer, NavLink } from "./Navigation.styles";
import { signOutUser } from "../../utill/firebase/firebase.auth";
import { userContext } from "../../context/userContext";

function Navigation() {
  const { currentUser, setCurrentUser } = useContext(userContext);

  const logoutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <NavContainer>
        <Link to="/">
          <h1>Chat Room</h1>
        </Link>
        {currentUser ? (
          <NavLink as="span" onClick={logoutHandler}>
            Log Out
          </NavLink>
        ) : (
          <NavLink to="/sign-in">Log In</NavLink>
        )}
      </NavContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
