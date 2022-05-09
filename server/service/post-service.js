const Post = require("../models/post-model");
const User = require("../models/user-model");
const ApiError = require("../exceptions/api-error");
const PostDto = require("../dtos/post-dto");

class PostService {
  async create(data){
    const post = new Post(data);
    const newPost = await post.save();

    return new PostDto(newPost);
  }

  async update(postId, userId, data){
    const post = await Post.findById(postId);

    if(!post) {
      throw ApiError.BadRequest("Пост не знайдено");
    }

    if (post.userId === userId) {
      const updatedPost = await post.updateOne({ $set: data });
      return new PostDto(updatedPost);
    } else {
      throw ApiError.Forbidden("Ви можете редагувати тільки власні пости.");
    }
  }

  async delete(postId, userId){
    const post = await Post.findById(postId);

    if(!post) {
      throw ApiError.BadRequest("Пост не знайдено");
    }

    if (post.userId === userId) {
      return post.deleteOne();
    } else {
      throw ApiError.Forbidden("Ви можете видаляти тільки власні пости.");
    }
  }

  async like(postId, userId){
    const post = await Post.findById(postId);

    if(!post) {
      throw ApiError.BadRequest("Пост не знайдено");
    }

    let dtoOut;
    if (!post.likes.includes(userId)) {
      dtoOut = await post.updateOne({ $push: { likes: userId } });
    } else {
      dtoOut = await post.updateOne({ $pull: { likes: userId } });
    }
    return new PostDto(dtoOut);
  }

  async get(id) {
    const post = await Post.findById(id);

    if(!post) {
      throw ApiError.BadRequest("Пост не знайдено");
    }

    return new PostDto(post);
  }

  async getTimeLine(userId){
    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return userPosts.concat(...friendPosts);
  }

  async getTimeLineByName(username){
    const user = await User.findOne({ username: username });
    return Post.find({ userId: user._id });
  }
}

module.exports = new PostService();