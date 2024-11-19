"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _passport = _interopRequireDefault(require("./middlewares/passport"));
var _passport2 = _interopRequireDefault(require("passport"));
var _keys = require("./config/keys");
var _api = _interopRequireDefault(require("./api"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use(_passport2["default"].initialize());
(0, _passport["default"])(_passport2["default"]);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
});
app.use("/api", _api["default"]);
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public/build")));
app.get("/", function (req, res) {
  res.sendFile(_path["default"].join(__dirname, "../public/build", "index.html"));
});
app.get("/test", function (req, res) {
  return res.send("working");
});
console.log("Server++++++++++++++++++++++");
app.listen(_keys.SERVER_PORT, function () {
  return console.log("Server is running on ".concat(_keys.SERVER_PORT));
});