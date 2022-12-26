import React, { createContext } from "react";
import { ThemeProvider } from "@mui/material"
import ReactDOM from "react-dom";
import App from "./App";
import Store from "./store/store";
import LoginForm from "./components/LoginForm";

const store = new Store();

export const Context = createContext({
  store
});

ReactDOM.render(
  <React.StrictMode>
      <Context.Provider value={{
        store
      }}>
        <App />
      </Context.Provider>
  </React.StrictMode>
,
  document.getElementById("root")
);
