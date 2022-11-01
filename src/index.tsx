import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ColorProvider from "./context/color.context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ColorProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
