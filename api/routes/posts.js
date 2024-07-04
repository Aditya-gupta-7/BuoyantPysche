const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


//Create Post
router.post("/", async (req, res) => {
    const newPost= new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    } 
});

//Update post
router.put("/:id", async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userName === req.body)
    } catch (error) {
        res.status(500).json(error);
    }
})


//Delete post

//Get a post

module.exports = router;