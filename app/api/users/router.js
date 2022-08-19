var express = require("express");
var router = express.Router();

// image
const multer = require("multer");
const os = require("os");

const { users, actionCreate, actionDelete } = require("./controller");

router.get("/datauser", users);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), actionCreate);
router.delete("/delete/:id", actionDelete);

module.exports = router;
