import React, { Fragment, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  NavContainer,
  NavLink,
  LogOutContainer,
  NavSpinner,
} from "./Navigation.styles";
import { signOutUser } from "../../utill/firebase/firebase.auth";
import { UserContext } from "../../context/userContext";
import { RtcContext } from "../../context/rtcContext";
import { RtmContext } from "../../context/rtmContext";

function Navigation() {
  const { currentUser, isLoading } = useContext(UserContext);
  const { clearRtcUser, localUser } = useContext(RtcContext);
  const { channel, rtmClient, clearClientAndChannel, clearMessages } =
    useContext(RtmContext);

  const navigate = useNavigate();

  const signOutHandler = async () => {
    let signOutConfirm = window.confirm("Do you really want to log out?");
    if (signOutConfirm) {
      if (localUser.user) {
        localUser.tracks[0].close();
        localUser.tracks[1].close();
        await localUser.user.leave();
        localUser.user.removeAllListeners();
        clearRtcUser();
      }
      if ((rtmClient && channel) !== null) {
        await channel.leave();
        await rtmClient.logout();
        clearClientAndChannel();
        clearMessages();
      }
      signOutUser();
      navigate("/");
    }
  };

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
            <NavLink as="span" onClick={signOutHandler}>
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
