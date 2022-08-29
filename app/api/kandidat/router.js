var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");
const { index, actionCreate, actionDelete, actionEdit, actionEditImage, kandidatDetails, kandidatAll } = require("./controller");
const { isLoginApiAdmin } = require('../../middleware/auth')

router.get("/kandidat", index);
router.get("/all-kandidat", isLoginApiAdmin, kandidatAll);
router.get("/details/:id", kandidatDetails);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), actionCreate);
router.put("/edit/:id", multer({ dest: os.tmpdir() }).single("file"), actionEdit);
router.put("/uploadimg/:id", multer({ dest: os.tmpdir() }).single("image"), actionEditImage);
router.delete("/delete/:id", actionDelete);

module.exports = router;
