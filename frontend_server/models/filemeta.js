var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var filemeta_schema = new Schema(
	{
		name: String,
		author: String
	}
);

module.exports = mongoose.model("FileMeta", filemeta_schema);
