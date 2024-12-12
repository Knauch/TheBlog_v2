const express = require("express");
const router = express.Router();
const { Users } = require("../models/");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken} = require('../middlewares/AuthMiddleware')


// Create a new User in the database
router.post("/", async (req, res) => {
  const { username, password } = req.body
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({ username: username, password: hash })
    res.json("User created successfully");
  })
});

router.post("/login", async (req, res) => {

  const { username, password } = req.body

  //serching for the user
  const user = await Users.findOne({ where: { username: username } })

  // Handle case where user is not found
  if (!user) {
    return res.json({ error: "User not found" }); // Return here to prevent further code execution
  }

  // Comparing the password
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: "Wrong password for this user" }); // Return here as well
    }

    //saving stuff in seccion hystory with further access
    const accessToken = sign(
      {username: user.username, id: user.id},
      "secret_key"
    )

    res.json(accessToken)
  })
})

//to check whether we have proper JWT in the local storage
router.get('/login', validateToken, (req, res) => {
  res.json(req.user)
})

module.exports = router;
