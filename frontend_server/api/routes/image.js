const express = require("express");
var http = require('http');
const envvars = require("../setup/exportvars.js");
var router = express.Router();


router.get('/', async (req, res) => {
	try {
		let name = req.query.name;
		res.sendFile(`${envvars.SUB_PATH}/${name}`);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
