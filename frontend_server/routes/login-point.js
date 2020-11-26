const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
var http = require('http');
var fs = require('fs');
var multer = require("multer");
var upload = multer();
var router = express.Router();
const cookieParser = require('cookie-parser');

var FileMeta = require("../models/filemeta");

router.use(upload.array()); 
router.use(express.static('public'));

router.use(cookieParser());

router.post("/", async (req, res) => {
	try {
		if (!req.body.username || !req.body.password) {
			res.send({
				status: false,
				message: "you fucked up"
			});
		} else {
			res.cookie("session", {
				username: req.body.username
			}, { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true });
			res.redirect("./sub");
		}
	} catch (err) {
		console.log("something else bwoke");
		res.status(500).send(err);
	}
});

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

module.exports = router;
