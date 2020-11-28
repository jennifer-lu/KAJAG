const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
var http = require('http');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/testpage', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

module.exports = router;
