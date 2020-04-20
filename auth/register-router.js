const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/user-model.js");

router.post("/", (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 14;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json({message: `user ${user.username} registered`});
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;
