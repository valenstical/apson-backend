"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.readFile = exports.generateToken = exports.validatorFormater = exports.Response = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Response =
/*#__PURE__*/
function () {
  function Response() {
    _classCallCheck(this, Response);
  }

  _createClass(Response, null, [{
    key: "send",
    value: function send(response) {
      var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.STATUS.OK;
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.MESSAGE.SUCCESS_MESSAGE;
      var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      return response.status(code).json({
        code: code,
        data: data,
        message: message,
        status: status,
        timestamp: new Date().getTime()
      });
    }
  }]);

  return Response;
}();

exports.Response = Response;

var validatorFormater = function validatorFormater(_ref) {
  var param = _ref.param,
      msg = _ref.msg;
  return {
    field: param,
    message: msg
  };
};

exports.validatorFormater = validatorFormater;

var generateToken = function generateToken(payload) {
  var expiresIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '365d';
  return _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresIn
  });
};

exports.generateToken = generateToken;

var readFile = function readFile(file) {
  return _util["default"].promisify(_fs["default"].readFile)("".concat(process.env.BASE_DIR, "/").concat(file), 'utf-8');
};

exports.readFile = readFile;
var _default = {};
exports["default"] = _default;