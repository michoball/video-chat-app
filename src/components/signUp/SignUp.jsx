import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { userContext } from "../../context/userContext";
import { ThemeProvider } from "@mui/material/styles";
import FormInput from "../formInput/FormInput";
import { useNavigate } from "react-router-dom";

import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utill/firebase/firebase.auth";
import { AuthErrorCodes } from "firebase/auth";
import { theme } from "../UI/button/ButtonTheme.config";

import { SignUpContainer, FormContainer, ToggleSignUp } from "./SignUp.styles";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const { toggleSignForm } = useContext(userContext);
  const { setCurrentUser } = useContext(userContext);
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

    // console.log(displayName, email, password, confirmPassword);
    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      const userRes = await createUserDocumentFromAuth(user, { displayName });
      console.log(userRes);
      setCurrentUser({ user, displayName });
      // navigate("/");
    } catch (error) {
      if (error.message === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Input Email is already in used");
      }
      console.log(error);
    }
    resetFormField();
  };

  const toggleSignUpFormHandler = () => {
    toggleSignForm();
  };

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
