import { createContext } from 'react';
import AuthStore from '../store/auth-store';

const authStore = new AuthStore();

export const AuthContext = createContext({
  authStore,
});
export default AuthContext;
