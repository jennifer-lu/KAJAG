const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
var http = require('http');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1:27017/testup_db";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

var Schema = mongoose.Schema;

var filemeta_schema = new Schema(
	{
		name: String,
		author: String
	}
);

var FileMeta = mongoose.model("FileMeta", filemeta_schema);

app.use(fileUpload({
	createParentPath: true
}));

router.get("/sub", function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<form action="/upload-file" method="post" enctype="multipart/form-data">');
	res.write('<input type="file" name="sub"><br>');
	res.write('<input type="submit">');
	res.write('</form>');
	return res.end();
});

router.get("/list", function(req, res){
	names = FileMeta.find({ author: "test1" }).then(names => {
		res.send({
			status: true,
			message: "Files submitted",
			data: names
		});
	});
});



router.post("/upload-file", async (req, res) => {
	try {
		if (!req.files) {
			res.send({
				status: false,
				message: "No file"
			});
		} else {
			let sub = req.files.sub;

			sub.mv("./uploads/" + sub.name);

			var fileData = new FileMeta({
				name: sub.name,
				author: "test1"
			});
			fileData.save().then(item => {
				res.send({
					status: true,
					message: "File uploaded, database updated",
					data: {
						name: sub.name,
						mimetype: sub.mimetype,
						size: sub.size
					}
				});
			}).catch(err => {
				res.status(500).send("oops");
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

module.exports = router;
