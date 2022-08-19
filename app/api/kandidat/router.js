var express = require("express");
var router = express.Router();
const { index } = require("./controller");

router.get("/kandidat", index);

module.exports = router;
