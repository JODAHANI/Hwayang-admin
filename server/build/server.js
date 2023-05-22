"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _path = _interopRequireDefault(require("path"));
require("dotenv/config");
require("./js/db");
var _admin = _interopRequireDefault(require("./routes/admin"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use((0, _cookieParser["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "..", "/admin", "/build")
// path.join("/Users/jodahan/Desktop/hwayang-admin/server/admin/build")
));

app.use("/uploads", _express["default"]["static"](_path["default"].join(__dirname, "..", "./uploads")));
app.use("/api/admin", _admin["default"]);
var PORT = process.env.PORT || 5000;
app.get("/", function (req, res) {
  res.sendFile(_path["default"].join("/Users/jodahan/Desktop/hwayang-admin/server/admin/build/index.html"));
});
app.listen(PORT, function () {
  console.log("Example app listening on port ".concat(PORT));
});