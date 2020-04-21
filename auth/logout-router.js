const router = require("express").Router();

router.get("/", (req, res) => {
  if(req.session) {
      req.session.destroy(err => {
          if(err) {
              res.status(501).json({ message: 'you are not logged out'})
          } else {
              res.status(200).json({ message: 'you are logged out'})
          }
      })
  } else {
      res.status(200).json({ message: 'you are logged out still'})
  }
});

module.exports = router;
