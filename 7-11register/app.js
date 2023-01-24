var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const secret = "Fullstuck-login";

app.use(cors());
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "7-11all",
  port: 3306,
});

app.post("/register", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
    connection.execute(
      `INSERT INTO users (Email,Username,Password,Role) VALUES (?,?,?,?)`,
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

// app.post("/login", jsonParser, function (req, res, next) {
//   connection.execute(
//     `SELECT * FROM Customer WHERE Email=?`,
//     [req.body.Email,],
//     function (err, , fields) {
//       if (err) {
//         res.json({ status: "error", massage: err });
//         return;
//       }
//       res.json({ status: "ok" });
//     }
//   );
// });

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});
