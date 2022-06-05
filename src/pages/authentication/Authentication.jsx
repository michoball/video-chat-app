import React, { useContext } from "react";
import SignUp from "../../components/signUp/SignUp";
import SignIn from "../../components/signIn/SignIn";
import { UserContext } from "../../context/userContext";

import { AuthContainer } from "./Authentication.styles";

function Authentication() {
  const { IsSignUpForm } = useContext(UserContext);

  return (
    <AuthContainer>{IsSignUpForm ? <SignUp /> : <SignIn />}</AuthContainer>
  );
}

export default Authentication;
