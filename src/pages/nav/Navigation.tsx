import { Fragment } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  NavContainer,
  NavLink,
  LogOutContainer,
  NavSpinner,
} from "./Navigation.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsLoading,
} from "../../store/user/user.selector";
import { selectRtcLocalUser } from "../../store/rtc/rtc.selector";
import { clearRtcUser } from "../../store/rtc/rtc.action";
import {
  selectRtmChannel,
  selectRtmClient,
} from "../../store/rtm/rtm.selector";
import { clearRtm } from "../../store/rtm/rtm.action";
import { signOutStart } from "../../store/user/user.action";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading);
  const localUser = useSelector(selectRtcLocalUser);
  const rtmClient = useSelector(selectRtmClient);
  const channel = useSelector(selectRtmChannel);

  // Room 안에서 로그아웃 시 redux에서 모든 세션종료및 유저 정보 삭제
  const signOutHandler = async () => {
    if (window.confirm("Do you really want to log out?")) {
      try {
        if (localUser && localUser.user) {
          localUser.tracks[0].close();
          localUser.tracks[1].close();
          await localUser.user.leave();
          localUser.user.removeAllListeners();
          dispatch(clearRtcUser());
        }
        if (rtmClient && channel) {
          await channel.leave();
          await rtmClient.logout();
          dispatch(clearRtm());
        }
        dispatch(signOutStart());
        navigate("/");
      } catch (error) {
        console.log("error ocurred! logout from room", error);
      }
    }
  };

  return (
    <Fragment>
      <NavContainer>
        <Link to="/">
          <h1>Chat Room</h1>
        </Link>
        {isLoading ? (
          <NavSpinner />
        ) : (
          <>
            {currentUser ? (
              <LogOutContainer>
                <span>{currentUser.displayName}</span>
                <NavLink as="span" onClick={signOutHandler}>
                  Log Out
                </NavLink>
              </LogOutContainer>
            ) : (
              <NavLink to="/auth">Log In First</NavLink>
            )}
          </>
        )}
      </NavContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
