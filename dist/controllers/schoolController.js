"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _randomInt = _interopRequireDefault(require("random-int"));

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Member = _models["default"].Member,
    Op = _models["default"].Sequelize.Op;

var MemberController =
/*#__PURE__*/
function () {
  function MemberController() {
    _classCallCheck(this, MemberController);
  }

  _createClass(MemberController, null, [{
    key: "login",

    /**
     * Login a user
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(request, response, next) {
        var _request$body, username, password, encryptedPassword, _where, result, status, code, message;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _request$body = request.body, username = _request$body.username, password = _request$body.password;
                encryptedPassword = _bcryptjs["default"].hashSync(password, process.env.SECRET_KEY);
                _context.prev = 2;
                _context.next = 5;
                return Member.findOne({
                  where: (_where = {}, _defineProperty(_where, Op.or, {
                    email: username,
                    phone: username
                  }), _defineProperty(_where, "password", encryptedPassword), _where),
                  attributes: {
                    exclude: ['password']
                  }
                });

              case 5:
                result = _context.sent;
                status = result !== null;
                code = _constants.STATUS.UNATHORIZED;
                message = 'Your log in credentials are invalid.';

                if (status) {
                  result = result.dataValues;
                  result.token = (0, _utils.generateToken)({
                    id: result.id
                  });
                  code = _constants.STATUS.OK;
                  message = 'Log in  successful!';
                }

                _utils.Response.send(response, code, result, message, status);

                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](2);
                next(_context.t0);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 13]]);
      }));

      function login(_x, _x2, _x3) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return MemberController;
}();

var _default = MemberController;
exports["default"] = _default;