var express = require("express");
var router = express.Router();
const { landingPage, detailPage, actionCreate, actionDelete } = require("./controller");

router.get("/landingpage", landingPage);
router.get("/detail/:id", detailPage);
router.post("/add", actionCreate);
router.delete("/delete/:id", actionDelete);

module.exports = router;
