import React, { InputHTMLAttributes } from "react";
import { Input, FormInputContainer, FromInputLabel } from "./FormInput.styles";

type FromInputProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = React.forwardRef<HTMLInputElement, FromInputProps>(
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
