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
		if (!req.body.username || !req.body.password) {
			res.send({
				status: false,
				message: "you fucked up"
			});
		} else {
			UserData.find({ username: req.body.username}).then(users => {
				if (users.length == 1) {
					try {
						argon2.verify(users[0].passwordhash, req.body.password).then(matches => {
							if (matches) {
								res.cookie("session", {
									username: req.body.username
								}, { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true });
								res.redirect("./sub");
								// password match
								// (i hope this is obvious but this is NOT NOT NOT NOT NOT secure)
							} else {
								res.redirect("./login");
								// password did not match
							}
						}) 
					} catch (err) {
					// internal failure
					}
				} else {
					//either account doesnt exist, or multiple accounts exist
					res.send({
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
