const messagesService = require("../service/messages-service");

class MessagesController{
  async send(req, res, next){
    try {
      const messageData = await messagesService.send(req.body);
      return res.status(200).json(messageData);
    } catch (e) {
      next(e)
    }
  }

  async get(req, res, next){
    try {
      const messagesData = await messagesService.list(req.params.conversationId);
      return res.status(200).json(messagesData);
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new MessagesController();
