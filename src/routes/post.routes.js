const controller = require("../controllers/post.controller");

module.exports = function (app) {

    app.get("/api/users/:userId/posts", controller.getAllPostsOfUser);
    app.get("/api/users/:userId/posts/:postId", controller.getOnePostByUser);
    app.post("/api/users/:userId/posts", controller.createPostByUser);
    app.put("/api/users/:userId/posts/:postId", controller.updatePostByUser);
    app.delete("/api/users/:userId/posts/:postId", controller.deletePostByUser);

}