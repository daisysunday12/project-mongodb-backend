var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");

const { index, viewCreate, actionCreate } = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");

router.use(isLoginAdmin);

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), actionCreate);

module.exports = router;
