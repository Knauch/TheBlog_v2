const express = require("express");
const router = express.Router();
const { Posts } = require("../models/");

// Get all posts
router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

// Get a post by ID
router.get('/byId/:id', async (req, res) => {

  const id = req.params.id;

  //find by PK - sequlize comand to find stuff in DB
  const post = await Posts.findByPk(id);
  res.json(post);

})

// Create a new post
router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
