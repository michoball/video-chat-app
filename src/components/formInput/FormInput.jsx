import React from "react";
import { Input, FormInputContainer, FromInputLabel } from "./FormInput.styles";

function FormInput({ label, ...otherProps }) {
  return (
    <FormInputContainer>
      <FromInputLabel htmlFor={label}>{label}</FromInputLabel>
      <Input {...otherProps} />
    </FormInputContainer>
  );
}

export default FormInput;
