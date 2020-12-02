const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
var http = require('http');
var fs = require('fs');
var multer = require("multer");
var argon2 = require("argon2");
var upload = multer();
var router = express.Router();
const cookieParser = require('cookie-parser');

var UserData = require("../models/userdata");

router.use(upload.array());
router.use(express.static('public'));

router.use(cookieParser());

router.post("/", async (req, res) => {
	try {
		if (!req.body.username || !req.body.password || !req.body.passwordr) {
			res.send({
				status: false,
				message: "you fucked up"
			});
		} else if (req.body.password != req.body.passwordr) {
			res.send({
				status: false,
				message: "password different"
			});
		} //first check if username taken
		UserData.find({ username: req.body.username}).then(users => {
			if (users.length > 0) {
				res.send({
					status: false,
					message: "another user with username already exists"
				});
			} else {
				//The idea here is to save the uname + password w. argon2id hash + salt
				hash = argon2.hash(req.body.password, {
					type: argon2.argon2id,
				}).then(hash => {
					var userData = new UserData({
						username: req.body.username,
						passwordhash: hash
					});

					userData.save().then(item => {
						res.send({
							status: true,
							message: "Account created",
							data: {
								hash: hash
							}
						});
					}).catch(err => {
						console.log("database fuckuwury");
						res.status(500).send("oops");
					});
				}).catch(err => {
					console.log("hash fucked up");
				});
			}
		});

	} catch (err) {
		console.log("something else bwoke");
		res.status(500).send(err);
	}
});

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

module.exports = router;
