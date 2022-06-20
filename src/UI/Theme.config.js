import { ThemeProvider } from "styled-components";

export const AppThemeProvider = ({ children }) => {
  const theme = {
    lineColor: {
      base: "#a52aca",
      green: "#0ABF04",
      orange: "#F28705",
    },
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
