const express = require("express");
const router = express.Router();

router.get("/home", function (req, res) {
  res.render("home");
});
router.get("/", function (req, res) {
  res.send("home");
});

module.exports = router;
