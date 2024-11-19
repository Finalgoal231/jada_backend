"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _passportJwt = _interopRequireDefault(require("passport-jwt"));
var _keys = require("../config/keys");
var _db = require("../config/db");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var users = "users";
var jwtStrategy = _passportJwt["default"].Strategy;
var ExtractJwt = _passportJwt["default"].ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = _keys.JWT_SECRET;
var passportMiddleware = function passportMiddleware(passport) {
  passport.use(new jwtStrategy(opts, function (jwtPayload, done) {
    (0, _db.knex)(users).where("id", jwtPayload.id).first().then(function (user) {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })["catch"](function (err) {
      return console.log(err);
    });
  }));
};
var _default = exports["default"] = passportMiddleware;