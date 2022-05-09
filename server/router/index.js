const Router = require("express").Router;
const router = new Router();
const userController = require("../controllers/user-controller");
const postController = require("../controllers/post-controller");
const messagesController = require("../controllers/messages-controller");
const conversationController = require("../controllers/conversation-controller");

const { body } = require("express-validator");
const authMiddleware = require("../middllewares/auth-midalleware");

// user
router.post("/registration", body("email").isEmail(), body("password").isLength({ min: 3, max: 32}), userController.registration);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.get("/activate/:link", authMiddleware, userController.activate);
router.get("/refresh", authMiddleware, userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/user/", authMiddleware, userController.get);
router.put("/user/:id", authMiddleware,userController.updateUser);
router.get("/user/friends/:userId", authMiddleware, userController.getFriendsByUserId);
router.put("/user/:id/follow", authMiddleware, userController.follow);
router.put("/user/:id/unfollow", authMiddleware, userController.unfollow);


// post
router.post("/post/create", authMiddleware, body("desc").isLength({ max: 500}), postController.create);
router.put("/post/:id", authMiddleware, body("desc").isLength({ max: 500}), postController.update);
router.delete("/post/:id", authMiddleware, postController.delete);
router.put("/post/:id/like", authMiddleware, postController.like);
router.get("/post/:id", authMiddleware,  postController.get);
router.get("/post/timeline/:userId", authMiddleware, postController.getTimeLine);
router.get("/post/profile/:username", authMiddleware, postController.getTimeLineByName);

// message
router.post("/messages/", authMiddleware, messagesController.send);
router.get("/messages/:conversationId", authMiddleware, messagesController.get);

// conversation
router.post("/conversation/", authMiddleware, conversationController.create);
router.get("/conversation/:userId", authMiddleware, conversationController.list);
router.get("/conversation/find/:firstUserId/:secondUserId", authMiddleware, conversationController.get);


module.exports = router;
