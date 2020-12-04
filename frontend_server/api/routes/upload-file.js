const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
var http = require('http');
var fs = require('fs');
var router = express.Router();

const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
var FileMeta = require("../models/filemeta");
var authToken = require("./authToken.js");

router.use(fileUpload({
	createParentPath: true
}));

router.post("/", authToken, async (req, res) => {
	try {
		if (!req.files) {
			res.send({
				status: false,
				message: "No file"
			});
		} else {
			console.log();
			let sub = req.files.sub;

			sub.mv("./uploads/" + sub.name);

			var fileData = new FileMeta({
				name: sub.name,
				author: req.username
			});
			fileData.save().then(item => {
				res.send({
					status: true,
					message: "File uploaded, database updated",
					data: {
						name: sub.name,
						mimetype: sub.mimetype,
						size: sub.size,
						username: req.username
					}
				});
			}).catch(err => {
				console.log("database fuckuwury");
				res.status(500).send("oops");
			});
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
