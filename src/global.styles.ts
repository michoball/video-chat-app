import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

body {
  margin: 0;
  background-color: #1b1b1b;

  font-family: "Mukta", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

a {
  text-decoration: none;
}

* {
  margin: 0;
  box-sizing: border-box;
  color: white;
}
`;
