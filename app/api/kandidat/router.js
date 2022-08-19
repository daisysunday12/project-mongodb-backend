var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");
const { index, actionCreate, actionDelete, actionEdit } = require("./controller");

router.get("/kandidat", index);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), actionCreate);
router.put("/edit/:id", multer({ dest: os.tmpdir() }).single("file"), actionEdit);
router.delete("/delete/:id", actionDelete);

module.exports = router;
