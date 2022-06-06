import { BaseButton } from "./Button.styles";

function Button({ children, ...otherProps }) {
  return <BaseButton {...otherProps}>{children}</BaseButton>;
}

export default Button;
