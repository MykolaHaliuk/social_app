const ApiError = require("../exceptions/api-error");
const postService = require("../service/post-service");
const { validationResult } = require("express-validator");

class PostController{
  async create(req, res, next){
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.BadRequest("Помилка при валідації", errors.array()))
      }
      const postData = await postService.create(req.body);
      return res.status(200).json(postData);
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next){
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.BadRequest("Помилка при валідації", errors.array()))
      }
      const postData = await postService.update(req.params.id, req.body.userId, req.body);
      return res.status(200).json(postData);
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next){
    try {
      const postData = await postService.delete(req.params.id, req.body.userId);
      return res.status(200).json(postData);
    } catch (e) {
      next(e)
    }
  }

  async like(req, res, next){
    try {
      const postData = await postService.like(req.params.id, req.body.userId);
      return res.status(200).json(postData);
    } catch (e) {
      next(e)
    }
  }

  async get(req, res, next){
    try {
      const postData = await postService.get(req.params.id);
      return res.status(200).json(postData);
    } catch (e) {
      next(e)
    }
  }

  async getTimeLine(req, res, next){
    try {
      const postData = await postService.getTimeLine(req.params.userId);
      return res.status(200).json(postData);
    } catch (e) {
      next(e)
    }
  }

  async getTimeLineByName(req, res, next){
    try {
      const postData = await postService.getTimeLineByName(req.params.username);
      return res.status(200).json(postData);
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new PostController();
