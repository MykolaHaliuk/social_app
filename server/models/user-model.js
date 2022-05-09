const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true},
  username: { type: String, require: true },
  password: { type: String, required: true},
  isActivated: { type: Boolean, default: false},
  activationLink: {type: String},
  profilePicture: { type: String, default: "" },
  coverPicture: { type: String, default: "" },
  followers: { type: Array, default: [] },
  followings: { type: Array, default: [] },
  desc: { type: String },
  city: { type: String },
  from: { type: String },
  relationship: { type: Number, enum: [1, 2, 3] },
},  { timestamps: true })

module.exports = model("User", UserSchema);