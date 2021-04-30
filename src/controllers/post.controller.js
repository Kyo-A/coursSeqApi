const user = require("../models").user;
const post = require("../models").post;

module.exports = {

    async getAllPostsOfUser(req, res) {
        try {
            // ES6
            const {userId} = req.params; // ou const userId = req.params.userId; en ES5

            const userCollection = await user.findOne({
                id: req.params.userId
            });
            if (userCollection) {

                const postCollection = await post.findAll({
                    where: { userId: userId }
                })

                res.status(201).send(postCollection);
            }
            else {
                res.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },

    async createPostByUser(req, res) {

        try {
            const userCollection = await user.findOne({
                id: req.params.userId
            });
            if (userCollection) {
                const postCreated = await post.create({
                    titre: req.body.titre,
                    userId: req.params.userId
                });
                res.status(201).send(postCreated)
            }
            else {
                res.status(404).send("User Not Found")
            }

        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },

    async updatePostByUser(req, res) {
        const {postId} = req.params; // ou const userId = req.params.userId; en ES5

        try {
            const userCollection = await user.findOne({
                id: req.params.userId
            });

            if (userCollection) {

                const postCollection = await post.findOne(({
                    where: { id: postId }
                }))

                if (postCollection) {
                    const updatedPost = await postCollection.update({
                        titre: req.body.titre,
                        id: req.params.postId,
                        userId: req.params.userId
                    })

                    res.status(201).send(updatedPost);
                }
                else {
                    res.status(404).send("Post Not Found");
                }
            }
            else {
                res.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    },
    async deletePostByUser(req, res) {

        const {postId} = req.params; // ou const userId = req.params.userId; en ES5

        try {
            const userCollection = await user.findOne({
                id: req.params.userId
            });

            if (userCollection) {

                const deletedPost = await post.findOne(({
                    where: { id: postId }
                }))

                if (deletedPost) {
                    deletedPost.destroy();
                    res.status(201).send("Deleted");
                }
                else {
                    res.status(404).send("Post Not Found");
                }
            }
            else {
                re.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    },

    async getOnePostByUser(req, res) {
        const {postId} = req.params; // ou const userId = req.params.userId; en ES5

        try {
            const userCollection = await user.findOne({
                id: req.params.userId
            });

            if (userCollection) {

                const Post = await post.findOne(({
                    where: { id: postId }
                }))

                if (Post) {
                    res.status(201).send(Post);
                }
                else {
                    res.status(404).send("Post Not Found");
                }
            }
            else {
                res.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    }
}