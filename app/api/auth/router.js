var express = require('express');
var router = express.Router();
const { login } = require('./controller')
const multer = require('multer')
const os = require('os')


router.post('/login', login);

module.exports = router;
