import SignUp from "../../components/signUp/SignUp";
import SignIn from "../../components/signIn/SignIn";

import { AuthContainer } from "./Authentication.styles";
import { useSelector } from "react-redux";
import { selectIsSignUpForm } from "../../store/user/user.selector";

function Authentication() {
  const IsSignUpForm = useSelector(selectIsSignUpForm);

  return (
    <AuthContainer>{IsSignUpForm ? <SignUp /> : <SignIn />}</AuthContainer>
  );
}

export default Authentication;
