const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
var http = require("http");
var fs = require("fs");
var router = express.Router();
var axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
var FileMeta = require("../models/filemeta");
var authToken = require("./authToken.js");
const envvars = require("../setup/exportvars.js");
const path = require('path');

router.use(
	fileUpload({
		createParentPath: true,
	})
);

router.post("/", authToken, async (req, res) => {
	try {
		if (!req.files) {
			res.send({
				status: false,
				message: "No file"
			});
		} else {
			let sub = req.files.sub;
			const name = path.parse(sub.name).name
			console.log(`${envvars.SUB_PATH}/${name}`);

			sub.mv(`${envvars.SUB_PATH}/${name}`);
			console.log(name)
			console.log("moved");
			var reqData = {
				name: name,
				question: 1,
				assignment: 1,
				page: 1,
				email: req.username
			};
			console.log("test2");

			axios.post(`http://flask:5000/`, reqData, { timeout: 1000 }).then(res => {
				console.log("file submitted");
			}).catch(err => {
				console.log("error");
				//early return because the file (probably) doesnt exist
				//update: jk dont lol
			});

			var fileData = new FileMeta({
				name: name + ".jpg",
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
				console.log("database error");
				res.status(500).send("oops");
			});
		}
	} catch (err) {
		console.log("other error");
		res.status(500).send(err);
	}
});

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;
