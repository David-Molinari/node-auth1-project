const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/user-model.js");

router.post("/", (req, res) => {
  let { username, password } = req.body;
  if (username != null && password != null) {
    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.loggedIn = true;
          res.status(200).json({ message: "Welcome!" });
        } else {
          res.status(401).json({ message: "You cannot pass!" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
      });
  } else {
    res.status(500).json({ message: "invalid credentials" });
  };
});

module.exports = router;
