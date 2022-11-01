import { ThemeProvider } from "styled-components";
import { ReactNode, useContext } from "react";
import { ColorContext } from "../context/color.context";

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const { color } = useContext(ColorContext);

  const theme = {
    lineColor: color,
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
