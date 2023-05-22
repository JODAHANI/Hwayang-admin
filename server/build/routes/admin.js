"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _moment = _interopRequireDefault(require("moment"));
var _Users = _interopRequireDefault(require("../Models/Users"));
var _Models = require("../Models/Models");
var _auth = require("../middleware/auth");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var adminRouter = _express["default"].Router();
var notificationStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/admin/notification/");
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  }
});
var worshipStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/admin/worship/");
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  }
});
var newFamilyStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/admin/newFamily/");
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  }
});
var notificationUpload = (0, _multer["default"])({
  storage: notificationStorage
}).single("file");
var newFamilyUpload = (0, _multer["default"])({
  storage: newFamilyStorage
}).single("file");
var worshipUpload = (0, _multer["default"])({
  storage: worshipStorage
}).single("file");
adminRouter.get("/auth", _auth.auth, function (req, res) {
  res.status(200).json({
    id: req.user._id,
    isAuth: true,
    account: req.user.account,
    name: req.user.name
  });
});
adminRouter.post("/login", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, account, password, user, userPasswordCompare, userGenerateToken;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, account = _req$body.account, password = _req$body.password;
          _context.next = 3;
          return _Users["default"].findOne({
            account: account
          });
        case 3:
          user = _context.sent;
          if (user) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.json({
            loginSuccess: false,
            message: "가입 된 아이디가 없습니다."
          }));
        case 6:
          if (!(user.role === 0)) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.json({
            loginSuccess: false,
            message: "관리자 계정이 아닙니다."
          }));
        case 8:
          _context.next = 10;
          return user.comparePassword(password);
        case 10:
          userPasswordCompare = _context.sent;
          if (userPasswordCompare) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.json({
            loginSuccess: false,
            message: "비밀번호가 맞지 않습니다."
          }));
        case 13:
          _context.next = 15;
          return user.generateToken();
        case 15:
          userGenerateToken = _context.sent;
          if (userGenerateToken.token) {
            _context.next = 18;
            break;
          }
          return _context.abrupt("return", res.json({
            loginSuccess: false,
            message: "로그인 실패."
          }));
        case 18:
          return _context.abrupt("return", res.cookie("w_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
            userName: user.name
          }));
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
adminRouter.post("/register", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, name, account, password, checkPassword, position, phoneNumber, authNumber, userFind, user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, account = _req$body2.account, password = _req$body2.password, checkPassword = _req$body2.checkPassword, position = _req$body2.position, phoneNumber = _req$body2.phoneNumber, authNumber = _req$body2.authNumber;
          if (!(process.env.AUTH_NUMBER !== authNumber)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.json({
            success: false,
            err: "인증코드가 맞지 않습니다."
          }));
        case 3:
          _context2.next = 5;
          return _Users["default"].findOne({
            account: account
          });
        case 5:
          userFind = _context2.sent;
          if (!userFind) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.json({
            success: false,
            err: "동일한 아이디가 존재합니다."
          }));
        case 8:
          if (!(password != checkPassword)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.json({
            success: false,
            err: "패스워드가 일치하지 않습니다."
          }));
        case 10:
          _context2.next = 12;
          return _Users["default"].create({
            account: account,
            password: password.toLowerCase(),
            name: name,
            position: position,
            role: 1,
            phoneNumber: phoneNumber
          });
        case 12:
          user = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            success: true
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
adminRouter.get("/logout", _auth.auth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var logoutUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _Users["default"].findOneAndUpdate({
            _id: req.user._id
          }, {
            token: ""
          }, {
            "new": true
          });
        case 2:
          logoutUser = _context3.sent;
          if (logoutUser) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", res.json({
            success: false,
            err: err
          }));
        case 5:
          return _context3.abrupt("return", res.json({
            success: true
          }));
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
adminRouter.get("/proclamation", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var logos;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _Models.Logos.findOne();
        case 2:
          logos = _context4.sent;
          return _context4.abrupt("return", res.json({
            success: true,
            logos: logos
          }));
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
adminRouter.post("/proclamation-update", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body3, message, paragraph, logos;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, message = _req$body3.message, paragraph = _req$body3.paragraph;
          _context5.next = 3;
          return _Models.Logos.findOne();
        case 3:
          logos = _context5.sent;
          logos.paragraph = paragraph;
          logos.todayLogos = message;
          logos.logosList.push({
            paragraph: paragraph,
            message: message
          });
          _context5.next = 9;
          return logos.save();
        case 9:
          return _context5.abrupt("return", res.json({
            success: true,
            logos: logos
          }));
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
adminRouter.post("/notification/image-save", function (req, res) {
  notificationUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        err: err
      });
    }
    var filePath = res.req.file.path;
    return res.json({
      success: true,
      filePath: filePath
    });
  });
});
adminRouter.post("/notification/get-notification", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, notification;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.body.id;
          _context6.next = 3;
          return _Models.Notification.findById(id);
        case 3:
          notification = _context6.sent;
          return _context6.abrupt("return", res.json({
            success: true,
            notification: notification
          }));
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
adminRouter.post("/notification/edit-notification", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body4, id, title, contents, imagePath, notification;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body4 = req.body, id = _req$body4.id, title = _req$body4.title, contents = _req$body4.contents, imagePath = _req$body4.imagePath;
          _context7.next = 3;
          return _Models.Notification.findOneAndUpdate({
            _id: id
          }, {
            title: title,
            contents: contents,
            imagePath: imagePath
          }, {
            "new": true
          });
        case 3:
          notification = _context7.sent;
          return _context7.abrupt("return", res.json({
            success: true,
            notification: notification
          }));
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
adminRouter.get("/notification/get-notifications", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var notification;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _Models.Notification.find();
        case 2:
          notification = _context8.sent;
          return _context8.abrupt("return", res.json({
            success: true,
            notification: notification
          }));
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
adminRouter.post("/notification/upload-notification", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body5, title, contents, imagePath, notification;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _req$body5 = req.body, title = _req$body5.title, contents = _req$body5.contents, imagePath = _req$body5.imagePath;
          _context9.next = 3;
          return _Models.Notification.create({
            title: title,
            contents: contents,
            imagePath: imagePath
          });
        case 3:
          notification = _context9.sent;
          return _context9.abrupt("return", res.json({
            success: true,
            notification: notification
          }));
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
adminRouter.post("/new-family/image-save", function (req, res) {
  newFamilyUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false
      });
    }
    var imagePath = res.req.file.path;
    return res.json({
      success: true,
      imagePath: imagePath
    });
  });
});
adminRouter.post("/new-family", /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body6, limit, skip, newFamily;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _req$body6 = req.body, limit = _req$body6.limit, skip = _req$body6.skip;
          _context10.prev = 1;
          _context10.next = 4;
          return _Models.NewFamily.find().sort({
            _id: -1
          }).skip(skip).limit(limit);
        case 4:
          newFamily = _context10.sent;
          if (!(newFamily.length < limit)) {
            _context10.next = 7;
            break;
          }
          return _context10.abrupt("return", res.json({
            success: true,
            newFamily: newFamily,
            isScroll: false
          }));
        case 7:
          return _context10.abrupt("return", res.json({
            success: true,
            newFamily: newFamily,
            isScroll: true
          }));
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](1);
          return _context10.abrupt("return", res.json({
            success: false
          }));
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 10]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
adminRouter.post("/new-family/edit-new-family", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _req$body7, id, name, invitationPerson, date, imagePath, newFamily;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _req$body7 = req.body, id = _req$body7.id, name = _req$body7.name, invitationPerson = _req$body7.invitationPerson, date = _req$body7.date, imagePath = _req$body7.imagePath;
          _context11.next = 3;
          return _Models.NewFamily.findOneAndUpdate({
            _id: id
          }, {
            name: name,
            invitationPerson: invitationPerson,
            date: date,
            imagePath: imagePath
          }, {
            "new": true
          });
        case 3:
          newFamily = _context11.sent;
          return _context11.abrupt("return", res.json({
            success: true,
            newFamily: newFamily
          }));
        case 5:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
adminRouter.post("/new-family/upload-new-family", /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$body8, name, invitationPerson, imagePath, date, momentDate, newFamily;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _req$body8 = req.body, name = _req$body8.name, invitationPerson = _req$body8.invitationPerson, imagePath = _req$body8.imagePath, date = _req$body8.date;
          console.log(name, invitationPerson, imagePath, date);
          momentDate = (0, _moment["default"])(date).format("YYYY-MM-DD");
          _context12.next = 5;
          return _Models.NewFamily.create({
            name: name,
            invitationPerson: invitationPerson,
            imagePath: imagePath,
            date: momentDate
          });
        case 5:
          newFamily = _context12.sent;
          return _context12.abrupt("return", res.json({
            success: true,
            newFamily: newFamily
          }));
        case 7:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
adminRouter.post("/worship/image-save", /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          worshipUpload(req, res, function (err) {
            if (err) {
              return res.json({
                success: false
              });
            }
            var imagePath = res.req.file.path;
            return res.json({
              success: true,
              imagePath: imagePath
            });
          });
        case 1:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
adminRouter.post("/worship-management", /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var id, offLineWorship;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          id = req.body.id;
          _context14.next = 4;
          return _Models.OffLineWorship.findById(id);
        case 4:
          offLineWorship = _context14.sent;
          return _context14.abrupt("return", res.json({
            success: true,
            offLineWorship: offLineWorship
          }));
        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](0);
          return _context14.abrupt("return", res.json({
            success: false
          }));
        case 11:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 8]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
adminRouter.get("/worship-management", /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var offLineWorship;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return _Models.OffLineWorship.find().sort({
            _id: -1
          });
        case 3:
          offLineWorship = _context15.sent;
          return _context15.abrupt("return", res.json({
            success: true,
            offLineWorship: offLineWorship
          }));
        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](0);
          return _context15.abrupt("return", res.json({
            success: false
          }));
        case 10:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 7]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
adminRouter.post("/worship-management/add", /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var _req$body9, title, speaker, date, time, openDate, openTime, imagePath, limit, offLineWorship;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _req$body9 = req.body, title = _req$body9.title, speaker = _req$body9.speaker, date = _req$body9.date, time = _req$body9.time, openDate = _req$body9.openDate, openTime = _req$body9.openTime, imagePath = _req$body9.imagePath, limit = _req$body9.limit;
          console.log(title, speaker, date, time, openDate, openTime, imagePath, limit);
          _context16.next = 5;
          return _Models.OffLineWorship.create({
            title: title,
            speaker: speaker,
            date: date,
            time: time,
            openDate: openDate,
            openTime: openTime,
            imagePath: imagePath,
            limit: limit
          });
        case 5:
          offLineWorship = _context16.sent;
          console.log(offLineWorship);
          return _context16.abrupt("return", res.json({
            success: true,
            offLineWorship: offLineWorship
          }));
        case 10:
          _context16.prev = 10;
          _context16.t0 = _context16["catch"](0);
          return _context16.abrupt("return", res.json({
            success: false
          }));
        case 13:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 10]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
adminRouter.post("/worship-management/edit", /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var _req$body10, id, title, speaker, date, time, openDate, openTime, imagePath, limit, offLineWorship;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _req$body10 = req.body, id = _req$body10.id, title = _req$body10.title, speaker = _req$body10.speaker, date = _req$body10.date, time = _req$body10.time, openDate = _req$body10.openDate, openTime = _req$body10.openTime, imagePath = _req$body10.imagePath, limit = _req$body10.limit;
          _context17.next = 4;
          return _Models.OffLineWorship.findOneAndUpdate({
            _id: id
          }, {
            title: title,
            speaker: speaker,
            date: date,
            time: time,
            openDate: openDate,
            openTime: openTime,
            imagePath: imagePath,
            limit: limit
          }, {
            "new": true
          });
        case 4:
          offLineWorship = _context17.sent;
          return _context17.abrupt("return", res.json({
            success: true,
            offLineWorship: offLineWorship
          }));
        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](0);
          return _context17.abrupt("return", res.json({
            success: false
          }));
        case 11:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 8]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());
adminRouter.post("/worship-apply", /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var _req$body11, id, userId, offLineWorship, personLength, user, addWorship, message;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _req$body11 = req.body, id = _req$body11.id, userId = _req$body11.userId;
          _context18.next = 4;
          return _Models.OffLineWorship.findById(id);
        case 4:
          offLineWorship = _context18.sent;
          personLength = offLineWorship.parti.length;
          if (!(offLineWorship.limit <= personLength)) {
            _context18.next = 8;
            break;
          }
          throw new Error("신청 인원이 초과되었습니다.");
        case 8:
          _context18.next = 10;
          return _Users["default"].findById(userId);
        case 10:
          user = _context18.sent;
          _context18.next = 13;
          return offLineWorship.addParti(user._id);
        case 13:
          addWorship = _context18.sent;
          if (!addWorship) {
            _context18.next = 17;
            break;
          }
          _context18.next = 17;
          return user.addWorship(offLineWorship);
        case 17:
          return _context18.abrupt("return", res.json({
            success: true,
            offLineWorship: offLineWorship
          }));
        case 20:
          _context18.prev = 20;
          _context18.t0 = _context18["catch"](0);
          message = _context18.t0.message;
          return _context18.abrupt("return", res.json({
            success: false,
            message: message
          }));
        case 24:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 20]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());
adminRouter.post("/worship-result/cancel", /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var _req$body12, id, userId, offLineWorship, user, subtractWorship, userWorship, message;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _req$body12 = req.body, id = _req$body12.id, userId = _req$body12.userId;
          _context19.next = 4;
          return _Models.OffLineWorship.findById(id);
        case 4:
          offLineWorship = _context19.sent;
          _context19.next = 7;
          return _Users["default"].findById(userId);
        case 7:
          user = _context19.sent;
          _context19.next = 10;
          return offLineWorship.subtract(user._id);
        case 10:
          subtractWorship = _context19.sent;
          if (!subtractWorship) {
            _context19.next = 14;
            break;
          }
          _context19.next = 14;
          return user.subtractWorship(offLineWorship._id);
        case 14:
          userWorship = user.worship;
          return _context19.abrupt("return", res.json({
            success: true,
            userWorship: userWorship
          }));
        case 18:
          _context19.prev = 18;
          _context19.t0 = _context19["catch"](0);
          message = "죄송합니다 일시적인 오류가 발생했습니다.";
          return _context19.abrupt("return", res.json({
            success: false,
            message: message
          }));
        case 22:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 18]]);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
var _default = adminRouter;
exports["default"] = _default;