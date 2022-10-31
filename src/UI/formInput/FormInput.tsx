import React, { InputHTMLAttributes } from "react";
import { Input, FormInputContainer, FromInputLabel } from "./FormInput.styles";

type FormInputProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const { label, ...otherProps } = props;
    return (
      <FormInputContainer>
        <FromInputLabel htmlFor={label}>{label && label}</FromInputLabel>
        <Input ref={ref} {...otherProps} />
      </FormInputContainer>
    );
  }
);

export default FormInput;
