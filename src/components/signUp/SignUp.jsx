import { Button } from "@mui/material";
import { useState } from "react";

import FormInput from "../../UI/formInput/FormInput";

import { useNavigate } from "react-router-dom";
import FormContainer from "../../UI/formContainer/FormContainer";
import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utill/firebase/firebase.auth";
import { AuthErrorCodes } from "firebase/auth";
import Spinner from "../../UI/spinner/spinner";
import { toggleSignForm } from "../../store/user/user.action";

import {
  SignUpContainer,
  ToggleSignUp,
  ButtonContainer,
} from "./SignUp.styles";
import { useDispatch } from "react-redux";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(toggleSignForm());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SignUpContainer>
      <h1> Make Your New Account</h1>
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
          label="Password Confirm"
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={onChangeHandler}
        />

        <ButtonContainer>
          <Button
            style={{ width: "300px" }}
            variant="outlined"
            color="secondary"
            size="large"
            type="submit"
          >
            submit
          </Button>
        </ButtonContainer>
      </FormContainer>
      <ToggleSignUp onClick={toggleSignUpFormHandler}>
        Back to Log in
      </ToggleSignUp>
    </SignUpContainer>
  );
};

export default SignUp;
