import React, { useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import UserService from "./services/UserService";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if(localStorage.getItem("token")){
      store.checkAuth();
    }
  }, []);
  if(store.isLoading){
    return "..."
  }

  if(!store.isAuth){
    return   <LoginForm />
  }

  async function getUsers(){
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <h1> {store.isAuth ? "OK": "ne ok"}</h1>
      <h1>{store.user.isActivated ? "Активований" : "Не активований"}</h1>
      <button onClick={() => store.logout()}>Вийти</button>
      <div>
        <button onClick={() => getUsers()}>Get User</button>
      </div>
      {users.map((u) =>
        <div key={u.email}>{u.email}</div>
      )}
      <Button />
    </div>
  );
}

export default observer(App);
