import { ThemeProvider } from "styled-components";
import { useContext } from "react";
import { ColorContext } from "../context/color.context";

export const AppThemeProvider = ({ children }) => {
  const { color } = useContext(ColorContext);

  const theme = {
    lineColor: color,
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
