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
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();

function authenticateToken(req, res, next) {
	// Gather the jwt access token from the request header
	const token = req.headers.token;
	console.log(token);
	if (token == null) return res.sendStatus(401) // if there isn't any token

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//		console.log(err);
		if (err) return res.sendStatus(403);
		req.username = user.username;
		console.log(user);
		next(); // pass the execution off to whatever request the client intended
	})
}

router.get("/", authenticateToken, function(req, res){
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
