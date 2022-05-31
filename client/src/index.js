import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthStore from "./store/auth-store";
import { AuthContext } from "./context/auth-context";
const authStore = new AuthStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContext.Provider value={{ authStore }}>
      <App />
    </AuthContext.Provider>
);
