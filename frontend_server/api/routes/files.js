const express = require("express");
var http = require('http');
const envvars = require("../setup/exportvars.js");
var router = express.Router();


router.get('/image', async (req, res) => {
	try {
		let name = req.query.name;
		res.sendFile(`${envvars.SUB_PATH}/${name}`);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get('/tex', async (req, res) => {
	try {
		let name = req.query.name;
		res.sendFile(`${envvars.TEX_PATH}/${name}`);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get('/pdf', async (req, res) => {
	try {
		let name = req.query.name;
		res.sendFile(`${envvars.PDF_PATH}/${name}`);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
