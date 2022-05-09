const conversationService = require("../service/conversation-service");

class ConversationController{
  async create(req, res, next){
    try {
      const conversation = await conversationService.create(req.body);
      return res.status(200).json(conversation);
    } catch (e) {
      next(e)
    }
  }

  async list(req, res, next){
    try {
      const conversationList = await conversationService.list(req.params.userId);
      return res.status(200).json(conversationList);
    } catch (e) {
      next(e)
    }
  }
  async get(req, res, next){
    try {
      const conversation = await conversationService.get(req.params.firstUserId, req.params.secondUserId);
      return res.status(200).json(conversation);
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new ConversationController();
