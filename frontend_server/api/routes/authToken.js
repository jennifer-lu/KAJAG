const jwt = require('jsonwebtoken');
const envvars = require("../setup/exportvars.js");
function authenticateToken(req, res, next) {
	// Gather the jwt access token from the request header
	const token = req.headers.token;
	console.log(token);
	if (token == null) return res.sendStatus(401) // if there isn't any token

	jwt.verify(token, envvars.TOKEN_SECRET, (err, user) => {
//		console.log(err);
		if (err) return res.sendStatus(403);
		req.username = user.username;
		console.log(user);
		next(); // pass the execution off to whatever request the client intended
	})
}

module.exports = authenticateToken;
