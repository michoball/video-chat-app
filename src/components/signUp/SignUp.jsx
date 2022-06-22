import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../../UI/formInput/FormInput";
import FormContainer from "../../UI/formContainer/FormContainer";

import {
  selectCurrentUser,
  selectIsLoading,
} from "../../store/user/user.selector";
import { signUpStart, toggleSignForm } from "../../store/user/user.action";

import {
  SignUpContainer,
  ToggleSignUp,
  ButtonContainer,
} from "./SignUp.styles";
import Spinner from "../../UI/spinner/spinner";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formField, setFormField] = useState(defaultFormField);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading);

  const { password, confirmPassword, email, displayName } = formField;

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

    if (password !== confirmPassword) {
      alert("Check your password");
    }
    dispatch(signUpStart(email, password, { displayName }));
    resetFormField();
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
            variant="contained"
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
