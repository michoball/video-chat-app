import React from "react";
import { Input, FormInputContainer, FromInputLabel } from "./FormInput.styles";

const FormInput = React.forwardRef((props, ref) => {
  const { label, ...otherProps } = props;
  return (
    <FormInputContainer>
      <FromInputLabel htmlFor={label}>{label && label}</FromInputLabel>
      <Input ref={ref} {...otherProps} />
    </FormInputContainer>
  );
});

export default FormInput;
