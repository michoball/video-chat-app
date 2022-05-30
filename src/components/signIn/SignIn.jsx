import { Button } from "@mui/material";
import { useContext, useState } from "react";

import FormInput from "../formInput/FormInput";
import {
  signInAuthWithEmailAndPassword,
  GoogleSignUpWithPopUp,
} from "../../utill/firebase/firebase.auth";
import { AuthErrorCodes } from "firebase/auth";

import {
  SignUpContainer,
  FormContainer,
  ButtonContainer,
  ToggleSignUp,
} from "./SignIn.styles";

import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const defaultFormField = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const { toggleSignForm } = useContext(UserContext);
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

    try {
      await signInAuthWithEmailAndPassword(email, password);
      resetFormField();
    } catch (error) {
      if (error.message === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Input Email is already in used");
      }
      console.log(error);
    }
    navigate("/");
  };

  const googleLogInHandler = async () => {
    await GoogleSignUpWithPopUp();

    navigate("/");
    //alert(`Welcome ${user.displayName} `);
  };

  const toggleSignUpFormHandler = () => {
    toggleSignForm();
  };

  if (isLoading) {
    return <h1 style={{ color: "white", fontSize: "30px" }}>Loading....</h1>;
  }

  return (
    <SignUpContainer>
      <h2> Enter Your Account</h2>
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
            size="large"
            type="submit"
          >
            <span> submit</span>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
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
