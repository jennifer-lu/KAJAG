const express = require("express");
var http = require('http');
var router = express.Router();

router.get("/", function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<form action="/login-point" method="post" enctype="multipart/form-data">');
	res.write('<input type="text" name="username"><br>');
	res.write('<input type="password" name="password"><br>');
	res.write('<input type="submit">');
	res.write('</form>');
	return res.end();
});

module.exports = router;
