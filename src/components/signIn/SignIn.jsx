import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import FormInput from "../../UI/formInput/FormInput";
import {
  signInAuthWithEmailAndPassword,
  GoogleSignUpWithPopUp,
} from "../../utill/firebase/firebase.auth";
import { AuthErrorCodes } from "firebase/auth";
import FormContainer from "../../UI/formContainer/FormContainer";

import {
  SignUpContainer,
  ButtonContainer,
  ToggleSignUp,
} from "./SignIn.styles";
import Spinner from "../../UI/spinner/spinner";

import { toggleSignForm } from "../../store/user/user.action";

const defaultFormField = {
  email: "",
  password: "",
};

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState(defaultFormField);

  const { password, email } = formField;

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
    setIsLoading(true);
    try {
      await signInAuthWithEmailAndPassword(email, password);
      resetFormField();
      setIsLoading(false);
    } catch (error) {
      if (error.message === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Input Email is already in used");
      }
      console.log(error);
      setIsLoading(false);
    }
    navigate("/");
  };

  const googleLogInHandler = async () => {
    setIsLoading(true);

    try {
      await GoogleSignUpWithPopUp();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    navigate("/");
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
            variant="outlined"
            color="secondary"
            type="submit"
            size="large"
          >
            <span> submit</span>
          </Button>
          <Button
            variant="outlined"
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
