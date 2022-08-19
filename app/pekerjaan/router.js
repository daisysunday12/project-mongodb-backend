var express = require("express");
var router = express.Router();
// image
const multer = require("multer");
const os = require("os");
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete, actionStatus, viewShow } = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");

router.use(isLoginAdmin);
/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);

// router.post("/create", actionCreate);

// with image
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), actionCreate);
router.get("/edit/:id", viewEdit);
router.get("/show/:id", viewShow);
// router.put("/edit/:id", actionEdit);
router.put("/edit/:id", multer({ dest: os.tmpdir() }).single("image"), actionEdit);
router.delete("/delete/:id", actionDelete);
router.put("/status/:id", actionStatus);

module.exports = router;
