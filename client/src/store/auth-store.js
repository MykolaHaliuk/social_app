import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";

export default class AuthStore {
  user = {};
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async login(data) {
    const response = await AuthService.login(data);
    localStorage.setItem("token", response.data.accessToken);
    this.setAuth(true);
    this.setAuth(response.data.user);
  }

  async registration(user) {
    try {
      const response = await AuthService.registration(user);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setAuth(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setAuth(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
