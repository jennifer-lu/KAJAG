var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var filemeta_schema = new Schema(
	{
		name: String,
		course: String,
		assignment: String,
		page: Number,
		author: String,
		question: Number
	}
);

module.exports = mongoose.model("FileMeta", filemeta_schema);
