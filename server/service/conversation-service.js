const ConversationModel = require("../models/conversation-model");

class ConversationService {
  async create(data){
    const newConversation = new ConversationModel({
      members: [data.senderId, data.receiverId],
    });
    return await newConversation.save();
  }
  async list(userId) {
    return ConversationModel.find({
      members: { $in: [userId] },
    });
  }
  async get(firstUserId, secondUserId) {
    return ConversationModel.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
  }
}

module.exports = new ConversationService();