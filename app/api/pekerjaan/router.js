var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");
const { landingPage, detailPage, actionCreate, actionDelete, actionEdit, uploadFile } = require("./controller");

router.get("/landingpage", landingPage);
router.get("/detail/:id", detailPage);
router.post("/add", multer({ dest: os.tmpdir() }).single("thumbnial"), actionCreate);
router.put("/update/:id", multer({ dest: os.tmpdir() }).single("thumbnial"), actionEdit);
router.put("/upload/:id", multer({ dest: os.tmpdir() }).single("thumbnial"), uploadFile);
router.delete("/delete/:id", actionDelete);

module.exports = router;
