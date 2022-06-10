import { CustomForm } from "./FormContainer.styles";

function FormContainer({ children, ...otherProps }) {
  return <CustomForm {...otherProps}>{children}</CustomForm>;
}

export default FormContainer;
