import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css';
import { ContextProvider } from "./Context.jsx";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline/>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
