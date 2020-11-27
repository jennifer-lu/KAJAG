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
const jwt = require('jsonwebtoken')
var router = express.Router();
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
dotenv.config();

var UserData = require("../models/userdata");

router.use(upload.array());
router.use(express.static('public'));

router.use(cookieParser());
function generateAccessToken(username) {
	// expires after half and hour (1800 seconds = 30 minutes)
	return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
router.post("/", async (req, res) => {
	try {
		if (!req.body.username || !req.body.password) {
			res.status(401).send({
				message: "no password"
			});
		} else {
			UserData.find({ username: req.body.username}).then(users => {
				if (users.length == 1) {
					try {
						argon2.verify(users[0].passwordhash, req.body.password).then(matches => {
							if (matches) {
								const token = generateAccessToken({ username: req.body.username });
								console.log(token);

								res.cookie("session", token);

								res.redirect("./sub");
								// password match
							} else {
								res.status(401).send({
									message: "wrong password"
								});
								// password did not match
							}
						})
					} catch (err) {
					// internal failure
					}
				} else {
					//either account doesnt exist, or multiple accounts exist
					res.status(401).send({
						status: false,
						message: "this account does not exist"
					});
				}

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
