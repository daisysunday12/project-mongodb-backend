var express = require("express");
var router = express.Router();
// image
const multer = require("multer");
const os = require("os");
// router
const { viewSignin } = require("./controller");

/* GET home page. */
router.get("/", viewSignin);

module.exports = router;
