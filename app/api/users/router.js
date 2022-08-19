var express = require("express");
var router = express.Router();

// image
const multer = require("multer");
const os = require("os");

const { users, actionCreate } = require("./controller");

router.get("/datauser", users);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), actionCreate);

module.exports = router;
