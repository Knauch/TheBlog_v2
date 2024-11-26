const express = require("express");
const router = express.Router();
const { Comments } = require("../models/");

//getting the comments
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    //finding in DB comments for the specific Post ID acordingly to params
    const comments = await Comments.findAll({
        where: {
            PostId: postId
        }
    });
    res.json(comments);
  
  })
  
//creating a new comment
  router.post('/', async (req, res) => {
    const comment = req.body
    await Comments.create(comment)
    res.json(comment);


  })



module.exports = router;