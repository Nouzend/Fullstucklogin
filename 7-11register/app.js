var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken")
const secret = ''

app.use(cors());
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "ap-southeast.connect.psdb.cloud",
  user: "c7x0cg6vy3ezlpug7070",
  password: "pscale_pw_4JcWIAvJgrfO7pxoJsEEqwAkjvRdxmpWMT8LgHNwbxf",
  database: "test",
  port: 3306,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/register", jsonParser, function (req, res, next) {
  bcrypt.hash( req.body.Password, saltRounds, function (err, hash) {
    connection.execute(
      `INSERT INTO Customer (Email,Password,Role) VALUES (?,?,?)`,
      [req.body.Email, hash, req.body.Role],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", massage: err });
          return;
        }
        res.json({ status: "ok" });
      }
    );
  });
});

app.post("/login", jsonParser, function (req, res, next) {

})

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});
