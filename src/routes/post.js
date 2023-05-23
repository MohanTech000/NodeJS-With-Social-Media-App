const router = require("express").Router();
const Post = require("../model/post");
const user = require("../model/user");



//create post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Update Post
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.findById(req.params.id);
        if (updatedPost.userId == req.body.userId) {
            await updatedPost.updateOne({ $set: req.body });
            res.status(200).json("Your post has been updated")
        } else {
            res.status(403).json("you can only update your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }
});


//Delete post
router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Your post has been deleted")

    } catch (error) {
        res.status(500).json(error)
    }
});

//Like Post/ dislike a post:
router.put("/:id/like", async (req, res) => {
    try {
        const likePost = await Post.findById(req.params.id);
        if (!likePost.likes.includes(req.body.userId)) {
            await likePost.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("post has been liked")
        } else {
            await likePost.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("post has been disliked")

        }

    } catch (error) {
        res.status(500).json(error)
    }
});

//get post likes:
router.get("/:id", async (req, res) => {
    try {


        const getPostLIkes = await Post.findById(req.params.id);
        res.status(200).json(getPostLIkes)

    } catch (error) {
        res.status(500).json(error);
    }
});

//get post timeline:
router.get("/timeline/all", async(req, res)=>{

    try {
         const currentUser = await user.findById(req.body.userId);        
         const userPosts = await Post.find({userId:currentUser._id});
         const frndPosts = await Promise.all(
            currentUser.followee.map((frndId=>{
                return Post.find({userId: frndId});
            }))
         );
         res.json(userPosts.concat(...frndPosts));
    } catch (error) {
        res.status(500).json(error)
        
    }
})




module.exports = router;