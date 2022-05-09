const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController{
  async registration(req, res, next){
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.BadRequest("Помилка при валідації", errors.array()))
      }
      const userData = await userService.registration(req.body);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next){
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.BadRequest("Помилка при валідації", errors.array()))
      }
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next){
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next){
    try {
      const activationLink = req.params.link;
      await  userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URI)

    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next){
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next){
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
  async get(req, res, next){
    try {
      const users = await userService.get(req.query);
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next){
    try {
      const users = await userService.updateUser(req.params.id, req.body);
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getFriendsByUserId(req, res, next){
    try {
      const users = await userService.getFriendsByUserId(req.params.userId);
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async follow(req, res, next){
    try {
      await userService.follow(req.params.id, req.body.userId);
      res.json("Ви почали стежити за новим користувачем");
    } catch (e) {
      next(e);
    }
  }

  async unfollow(req, res, next){
    try {
      await userService.follow(req.params.id, req.body.userId);
      res.json("Ви відписалися від користувача");
    } catch (e) {
      next(e);
    }
  }


}


module.exports = new UserController();