const express = require("express");
const router = express.Router();
const { Comments } = require("../models/");
const {validateToken} = require('../middlewares/AuthMiddleware')

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
  router.post('/', validateToken, async (req, res) => {
    const comment = req.body
    const username = req.user.username
    comment.username = username
    await Comments.create(comment)
    res.json(comment);

  })



module.exports = router;