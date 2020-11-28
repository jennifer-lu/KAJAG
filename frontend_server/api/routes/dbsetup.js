var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1:27017/testup_db";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


var Schema = mongoose.Schema;

var filemeta_schema = new Schema(
	{
		name: String,
		author: String
	}
);

var FileMeta = mongoose.model("FileMeta", filemeta_schema);
