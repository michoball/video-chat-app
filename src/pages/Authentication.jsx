import React, { useContext, useEffect } from "react";
import SignUp from "../components/signUp/SignUp";
import styled from "styled-components";
import SignIn from "../components/signIn/SignIn";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const navigate = useNavigate();
  const { IsSignUpForm } = useContext(UserContext);
  // useEffect(() => {
  //   if (currentUser) navigate("/");
  // }, [navigate, currentUser]);

  return (
    <AuthContainer>{IsSignUpForm ? <SignUp /> : <SignIn />}</AuthContainer>
  );
}

const AuthContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Authentication;
