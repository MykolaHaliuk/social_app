module.exports = class MessageDto{
  conversationId;
  sender;
  text;
  id;

  constructor(model) {
    this.conversationId = model.conversationId;
    this.sender = model.sender;
    this.id = model._id;
    this.text = model.text;
  }
}