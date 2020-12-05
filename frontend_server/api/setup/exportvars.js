const path=require("path")
console.log("in dotenv load, ", path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`))
require('dotenv').config({path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)})
console.log(process.env.NODE_ENV)
console.log(process.env.UPLOAD_ENDPOINT);
module.exports = {
	PORT: process.env.PORT,
	SUB_PATH: process.env.UPLOAD_ENDPOINT,
	FLASK_ENDPOINT: process.env.FLASK_ENDPOINT,
	TOKEN_SECRET: process.env.TOKEN_SECRET
}
