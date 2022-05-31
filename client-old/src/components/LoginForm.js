import React, { useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const { store } = useContext(Context);
  return (
    <div>
      <input type="email" placeholder={"Пошта"} onChange={e => setEmail(e.target.value)} value={email}/>
      <input type="password" placeholder={"Пароль"} onChange={e => setPassword(e.target.value)} value={password}/>
      <button onClick={() => store.login(email, password)}>Логін</button>
      <button onClick={() => store.registration(email, password)}>Реєстрація</button>
    </div>
  );
};

export default  observer(LoginForm);
