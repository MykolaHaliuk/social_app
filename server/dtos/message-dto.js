module.exports = class MessageDto{
  userId;
  desc;
  id;
  img;
  likes;

  constructor(model) {
    this.userId = model.userId;
    this.desc = model.desc;
    this.id = model._id;
    this.img = model.img;
    this.likes = model.likes;
  }
}