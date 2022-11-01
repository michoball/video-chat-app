import { ButtonHTMLAttributes, FC } from "react";
import { BaseButton } from "./Button.styles";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...otherProps
}) => {
  return <BaseButton {...otherProps}>{children}</BaseButton>;
};

export default Button;
