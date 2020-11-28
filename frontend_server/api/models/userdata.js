var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userdata_schema = new Schema(
	{
		username: String,
		passwordhash: String
	}
);

module.exports = mongoose.model("UserData", userdata_schema);
