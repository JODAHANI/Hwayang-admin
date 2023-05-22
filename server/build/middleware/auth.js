"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;
var _Users = _interopRequireDefault(require("../Models/Users"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var auth = function auth(req, res, next) {
  var token = req.cookies.w_auth;
  _Users["default"].analyzer(token, function (err, user) {
    if (user == null) {
      return res.json({
        isAuth: false,
        err: true
      });
    }
    req.token = token;
    req.user = user;
    next();
  });
};
exports.auth = auth;