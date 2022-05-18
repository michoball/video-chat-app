import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import FormInput from "../formInput/FormInput";
import {
  createUserDocumentFromAuth,
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
import { theme } from "../UI/button/ButtonTheme.config";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const defaultFormField = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(userContext);
  const { toggleSignForm } = useContext(userContext);
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
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user);
      if (user) {
        // navigate("/");
        setCurrentUser(user);
      }
    } catch (error) {
      if (error.message === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Input Email is already in used");
      }
      console.log(error);
    }
    resetFormField();
  };

  const googleLogInHandler = async () => {
    const { user } = await GoogleSignUpWithPopUp();
    await createUserDocumentFromAuth(user);
    if (user) {
      // navigate("/");
      setCurrentUser(user);
      alert(`Welcome ${user.displayName} `);
    }
  };

  const toggleSignUpFormHandler = () => {
    toggleSignForm();
  };

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
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="neutral"
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
          </ThemeProvider>
        </ButtonContainer>
      </FormContainer>
      <ToggleSignUp onClick={toggleSignUpFormHandler}>
        Create a New Account
      </ToggleSignUp>
    </SignUpContainer>
  );
};

export default SignIn;
