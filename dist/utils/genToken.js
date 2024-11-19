"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _keys = require("../config/keys");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var genToken = exports.genToken = function genToken(_ref) {
  var payload = _ref.payload,
    expiresIn = _ref.expiresIn,
    callback = _ref.callback;
  _jsonwebtoken["default"].sign(payload, _keys.JWT_SECRET, {
    expiresIn: expiresIn
  }, function (err, token) {
    if (err) console.log(err);
    callback(token);
  });
};