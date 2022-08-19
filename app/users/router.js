var express = require("express");
var router = express.Router();
// image
const multer = require("multer");
const os = require("os");

// middleware
const { isLoginAdmin } = require("../middleware/auth");

// router
const { viewSignin, actionSignin, actionLogout, actionCreate, viewCreate, index, actionDelete } = require("./controller");

router.get("/", viewSignin);
router.post("/", actionSignin);
router.get("/logout", actionLogout);

router.use(isLoginAdmin);
router.get("/users", index);
router.get("/create", viewCreate);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), actionCreate);
router.delete("/delete/:id", actionDelete);

module.exports = router;
