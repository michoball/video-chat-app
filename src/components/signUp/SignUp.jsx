import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { ThemeProvider } from "@mui/material/styles";
import FormInput from "../formInput/FormInput";
import { useNavigate } from "react-router-dom";

import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utill/firebase/firebase.auth";
import { AuthErrorCodes } from "firebase/auth";
import { theme } from "../../UI/MuiTheme.config";

import { SignUpContainer, FormContainer, ToggleSignUp } from "./SignUp.styles";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const { toggleSignForm } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState(defaultFormField);

  const { password, confirmPassword, email, displayName } = formField;

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

    if (password !== confirmPassword) {
      alert("Check your password");
    }
    setIsLoading(true);
    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      setIsLoading(false);
      resetFormField();
    } catch (error) {
      if (error.message === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Input Email is already in used");
      }
      console.log(error);
      setIsLoading(false);
    }
    navigate("/");
  };

  const toggleSignUpFormHandler = () => {
    toggleSignForm();
  };

  if (isLoading) {
    return <h1 style={{ color: "white", fontSize: "30px" }}>Loading....</h1>;
  }

  return (
    <SignUpContainer>
      <h2> Make Your New Account</h2>
      <FormContainer onSubmit={submitHandler}>
        <FormInput
          label="Name"
          type="text"
          id="displayName"
          placeholder="displayName"
          value={displayName}
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Email"
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Password"
          type="password"
          id="password"
          placeholder="password"
          value={password}
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="PasswordConfirm"
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={onChangeHandler}
        />

        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="neutral"
            size="large"
            type="submit"
          >
            submit
          </Button>
        </ThemeProvider>
      </FormContainer>
      <ToggleSignUp onClick={toggleSignUpFormHandler}>
        Back to Log in
      </ToggleSignUp>
    </SignUpContainer>
  );
};

export default SignUp;
