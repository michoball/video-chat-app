import React, { useContext, useState } from "react";
import SignUp from "../components/signUp/SignUp";
import styled from "styled-components";
import SignIn from "../components/signIn/SignIn";
import { userContext } from "../context/userContext";

function Authentication() {
  const { IsSignUpForm } = useContext(userContext);

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
