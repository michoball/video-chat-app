import SignUp from "../../components/signUp/SignUp";
import SignIn from "../../components/signIn/SignIn";

import { AuthContainer } from "./Authentication.styles";
import { useSelector } from "react-redux";
import { selectIsSignUpForm } from "../../store/user/user.selector";

function Authentication() {
  const isSignUpForm = useSelector(selectIsSignUpForm);

  return (
    <AuthContainer>{isSignUpForm ? <SignUp /> : <SignIn />}</AuthContainer>
  );
}

export default Authentication;
