module.exports = class UserDto{
  email;
  username;
  id;
  isActivated;
  profilePicture;
  coverPicture;
  followers;
  followings;
  desc;
  city;
  from;
  relationship;

  constructor(model) {
    this.email = model.email;
    this.username = model.username;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.profilePicture = model.profilePicture;
    this.coverPicture = model.coverPicture;
    this.followers = model.followers;
    this.followings = model.followings;
    this.desc = model.desc;
    this.city = model.city;
    this.from = model.from;
    this.relationship = model.relationship;
  }
}