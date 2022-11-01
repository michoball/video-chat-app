import React, { FC, FormHTMLAttributes } from "react";
import { CustomForm } from "./FormContainer.styles";

const FormContainer: FC<FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...otherProps
}) => {
  return <CustomForm {...otherProps}>{children}</CustomForm>;
};

export default FormContainer;
