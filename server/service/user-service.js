const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuId = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
class UserService {
  async registration(dtoIn){
    const candidate = await UserModel.findOne({email: dtoIn.email});
    if (candidate) {
      throw ApiError.BadRequest(`Користувач з поштою ${dtoIn.email} існує`);
    }
    const hashPassword = await bcrypt.hash(dtoIn.password, 3);
    const activationLink  =  uuId.v4();
    const user = await UserModel.create({ ...dtoIn, password: hashPassword });
    await mailService.sendActivationMail(dtoIn.email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    }
  }
  async activate(activateLink){
    const user = await UserModel.findOne({ activateLink});
    if(!user) {
      throw ApiError.BadRequest("Некоректна силка для активації");
    }
    user.isActivated = true;
    await user.save();
    return user;
  }
  async login(email, password){
    const user = await UserModel.findOne({ email });
    if(!user) {
      throw ApiError.BadRequest("Користувача не знайдено");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals){
      throw ApiError.BadRequest("Невірний пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async logout(refreshToken){
    return await tokenService.removeToken(refreshToken);

  }
  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
      const userData =tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      if(!userData || !tokenFromDb){
        throw ApiError.UnauthorizedError();
      }
      const user = await UserModel.findById(userData.id);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto };

  }
  async getAllUsers(){
    return UserModel.find();
  }
  async updateUser(userId, data){
    if (data.userId === userId) {
      if (data.password) {
          const salt = await bcrypt.genSalt(10);
          data.password = await bcrypt.hash(data.password, salt);
      }
        const user = await UserModel.findByIdAndUpdate(userId, {
          $set: data,
        });
        return new UserDto(user);
    } else {
      throw ApiError.Forbidden();
    }
  }
  async delete(paramId, bodyId){
    if (bodyId === paramId) {
        await UserModel.findByIdAndDelete(paramId);
        return {};
    } else {
      throw ApiError.Forbidden();
    }
  }
  async get(query){
    const userId = query.userId;
    const username = query.username;
      const user = userId
        ? await UserModel.findById(userId)
        : await UserModel.findOne({ username: username });
    return new UserDto(user);
  }
  async getFriendsByUserId(userId){
    const user = await UserModel.findById(userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      friendList.push(new UserDto(friend));
    });
    return friendList;
  }
  async follow(id, userId){
    if (userId !== id) {
      const user = await UserModel.findById(id);
      const currentUser = await UserModel.findById(userId);
      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId} });
        await currentUser.updateOne({ $push: { followings: id } });
        return {};
      } else {
        throw ApiError.BadRequest("Ви вже стажете ха даним користувачем.");
      }
    } else {
      throw ApiError.Forbidden();
    }
  }
  async unfollow(id, userId){
    if (userId !== id) {
      const user = await UserModel.findById(id);
      const currentUser = await UserModel.findById(userId);
      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        return {};
      } else {
        throw ApiError.BadRequest();
      }
    } else {
      throw ApiError.Forbidden();
    }
  }
}

module.exports = new UserService();