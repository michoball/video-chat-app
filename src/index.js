import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { RtcProvider } from "./context/rtcContext";
import { RtmProvider } from "./context/rtmContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <RtcProvider>
          <RtmProvider>
            <App />
          </RtmProvider>
        </RtcProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
