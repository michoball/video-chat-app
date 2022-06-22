import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../../UI/formInput/FormInput";
import FormContainer from "../../UI/formContainer/FormContainer";

import {
  SignUpContainer,
  ButtonContainer,
  ToggleSignUp,
} from "./SignIn.styles";
import Spinner from "../../UI/spinner/spinner";
import {
  selectCurrentUser,
  selectIsLoading,
} from "../../store/user/user.selector";
import {
  emailSignInStart,
  googleSignInStart,
  toggleSignForm,
} from "../../store/user/user.action";

const defaultFormField = {
  email: "",
  password: "",
};

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const currentUser = useSelector(selectCurrentUser);
  const [formField, setFormField] = useState(defaultFormField);

  const { password, email } = formField;

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const onChangeHandler = (e) => {
    setFormField({
      ...formField,
      [e.target.id]: e.target.value,
    });
  };

  const resetFormField = () => {
    setFormField(defaultFormField);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(emailSignInStart(email, password));
    resetFormField();
  };

  const googleLogInHandler = async () => {
    dispatch(googleSignInStart());
  };

  const toggleSignUpFormHandler = () => {
    dispatch(toggleSignForm());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SignUpContainer>
      <h1> Enter Your Account</h1>
      <FormContainer onSubmit={submitHandler}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Password"
          type="password"
          id="password"
          value={password}
          placeholder="password"
          required
          onChange={onChangeHandler}
        />

        <ButtonContainer>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            size="large"
          >
            <span> submit</span>
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            onClick={googleLogInHandler}
          >
            <span>Google log in</span>
          </Button>
        </ButtonContainer>
      </FormContainer>
      <ToggleSignUp onClick={toggleSignUpFormHandler}>
        Create a New Account
      </ToggleSignUp>
    </SignUpContainer>
  );
};

export default SignIn;
