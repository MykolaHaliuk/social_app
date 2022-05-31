import api from "../http";

export default class AuthService {
  static async login(data) {
    return api.post("/login", data);
  }

  static async registration(user) {
    return api.post("/registration", user);
  }

  static async logout() {
    return api.post("/logout");
  }
}
