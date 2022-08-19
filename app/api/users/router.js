var express = require("express");
var router = express.Router();
const { users, actionCreate } = require("./controller");

router.get("/datauser", users);
router.post("/create", actionCreate);

module.exports = router;
