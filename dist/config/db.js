"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.knex = void 0;
var _knexfile = _interopRequireDefault(require("../../knexfile"));
var _knex = _interopRequireDefault(require("knex"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var knex = exports.knex = (0, _knex["default"])(_knexfile["default"].development);