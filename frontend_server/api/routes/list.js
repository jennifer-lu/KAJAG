const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
var http = require('http');
var fs = require('fs');
var router = express.Router();
var FileMeta = require("../models/filemeta");
var authToken = require("./authToken.js");


router.get("/", authToken, function(req, res){
	names = FileMeta.find({ author: req.username }).then(names => {
		res.send({
			username: req.username,
			status: true,
			message: "Files submitted",
			data: names
		});
	});
});

module.exports = router;
