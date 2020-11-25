const express = require("express");
var http = require('http');
var router = express.Router();

router.get("/", function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<form action="/upload-file" method="post" enctype="multipart/form-data">');
	res.write('<input type="file" name="sub"><br>');
	res.write('<input type="submit">');
	res.write('</form>');
	return res.end();
});

module.exports = router;
