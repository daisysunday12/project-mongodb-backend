var express = require("express");
var router = express.Router();
// image
const multer = require("multer");
const os = require("os");
// router
const { viewSignin, actionSignin, actionLogout } = require("./controller");
// const { isLoginAdmin } = require("../middleware/auth");

/* GET home page. */
router.get("/", viewSignin);
router.post("/", actionSignin);
router.get("/logout", actionLogout);

// router.use(isLoginAdmin);

module.exports = router;
