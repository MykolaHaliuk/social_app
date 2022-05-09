const MessageModel = require("../models/user-model");
const MessageDto = require("../dtos/message-dto");

class MessagesService {
  async send(data){
    const newMessage = new MessageModel(data);
    const message = await newMessage.save();

    return new MessageDto(message);
  }
  async list(conversationId) {
    return MessageModel.find({
      conversationId,
    });
  }
}

module.exports = new MessagesService();