var express = require("express");
var router = express.Router();
const { users } = require("./controller");

router.get("/datauser", users);

module.exports = router;
