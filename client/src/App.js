import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
// import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
// import Messenger from "./pages/messenger/Messenger";
import { useAuthContext } from "./context/use-auth-context";
import { observer } from "mobx-react-lite";
import { Box, CircularProgress } from "@mui/material";


function App() {
  const { authStore } = useAuthContext();
  useEffect(() => {
    if(localStorage.getItem("token")){
      authStore.checkAuth();
    }
  }, []);

  if(authStore.isLoading){
    return <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress />
    </Box>;
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authStore.isAuth ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{authStore.isAuth ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {authStore.isAuth ? <Redirect to="/" /> : <Register />}
        </Route>
        {/*<Route path="/messenger">*/}
        {/*  {!authStore.isAuth ? <Redirect to="/" /> : <Messenger />}*/}
        {/*</Route>*/}
        {/*<Route path="/profile/:username">*/}
        {/*  <Profile />*/}
        {/*</Route>*/}
      </Switch>
    </Router>
  );
}

export default observer(App);
