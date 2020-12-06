const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
var http = require("http");
var fs = require("fs");
var router = express.Router();
var axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
var FileMeta = require("../models/filemeta");
var authToken = require("./authToken.js");
const envvars = require("../setup/exportvars.js");
router.use(
  fileUpload({
    createParentPath: true,
  })
);

router.post("/", authToken, async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file",
      });
    } else {
      axios
        .get("flask://flask:80/healthcheck")
        .then((res) => {
          console.log("works flask://flask:80/healthcheck");
        })
        .catch((err) => {
          console.log("error flask://flask:80/healthcheck");
        });
      axios
        .get("http://localhost:5000/healthcheck")
        .then((res) => {
          console.log("works http://localhost:5000/healthcheck");
        })
        .catch((err) => {
          console.log("error http://localhost:5000/healthcheck");
        });
      axios
        .get("http://flask:80/healthcheck")
        .then((res) => {
          console.log("works http://flask:80/healthcheck");
        })
        .catch((err) => {
          console.log("error http://flask:80/healthcheck");
        });
      let sub = req.files.sub;
      console.log(`${envvars.SUB_PATH}/${sub.name}`);

      sub.mv(`${envvars.SUB_PATH}/${sub.name}`);
      console.log("moved");
      var reqData = {
        name: sub.name,
        question: 1,
        assignment: 1,
        page: 1,
        email: req.username,
      };
      console.log("test2");

      axios
        .post(`flask://flask:80/`, reqData, { timeout: 1000 })
        .then((res) => {
          console.log("file submitted");
        })
        .catch((err) => {
          console.log("error");
          //early return because the file (probably) doesnt exist
          //update: jk dont lol
        });

      var fileData = new FileMeta({
        name: sub.name,
        author: req.username,
      });
      fileData
        .save()
        .then((item) => {
          res.send({
            status: true,
            message: "File uploaded, database updated",
            data: {
              name: sub.name,
              mimetype: sub.mimetype,
              size: sub.size,
              username: req.username,
            },
          });
        })
        .catch((err) => {
          console.log("database error");
          res.status(500).send("oops");
        });
    }
  } catch (err) {
    console.log("other error");
    res.status(500).send(err);
  }
});

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;
