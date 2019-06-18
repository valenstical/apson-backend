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

var _sendMail = _interopRequireDefault(require("../helpers/sendMail"));

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

                return _context.abrupt("return", _utils.Response.send(response, code, result, message, status));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", _utils.Response.send(response, _constants.STATUS.SERVER_ERROR, [], 'Log in failed, please try again.', false));

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
    /**
     * Register  a user
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "registerMember",
    value: function () {
      var _registerMember = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(request, response) {
        var body, _ref, dataValues;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                body = request.body;
                _context2.prev = 1;
                body.id = "".concat(_constants.STATE_CODES[body.state]).concat((0, _randomInt["default"])(100000, 999999));
                _context2.next = 5;
                return Member.create(body);

              case 5:
                _ref = _context2.sent;
                dataValues = _ref.dataValues;
                delete dataValues.password;
                dataValues.token = (0, _utils.generateToken)({
                  id: dataValues.id
                });
                return _context2.abrupt("return", _utils.Response.send(response, _constants.STATUS.CREATED, dataValues, 'Registration sucessful!', true));

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", MemberController.displayInsertError('Registration failed.', _context2.t0, response));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 12]]);
      }));

      function registerMember(_x4, _x5) {
        return _registerMember.apply(this, arguments);
      }

      return registerMember;
    }()
    /**
     * Update a user
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "updateMember",
    value: function () {
      var _updateMember = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(request, response) {
        var id;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = response.locals.authValue.id;
                _context3.prev = 1;
                _context3.next = 4;
                return Member.update(request.body, {
                  where: {
                    id: id
                  }
                });

              case 4:
                return _context3.abrupt("return", _utils.Response.send(response, _constants.STATUS.CREATED, [], 'Update sucessful!', true));

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", MemberController.displayInsertError('Update member details failed.', _context3.t0, response));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 7]]);
      }));

      function updateMember(_x6, _x7) {
        return _updateMember.apply(this, arguments);
      }

      return updateMember;
    }()
    /**
     * Update profile image
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "updateProfileImage",
    value: function () {
      var _updateProfileImage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(request, response) {
        var id, url;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = response.locals.authValue.id;
                url = request.body.url;
                _context4.prev = 2;
                _context4.next = 5;
                return Member.update({
                  image: url
                }, {
                  where: {
                    id: id
                  }
                });

              case 5:
                return _context4.abrupt("return", _utils.Response.send(response, _constants.STATUS.CREATED, [], 'Update sucessful!', true));

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](2);
                return _context4.abrupt("return", MemberController.displayInsertError('Update member details failed.', _context4.t0, response));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 8]]);
      }));

      function updateProfileImage(_x8, _x9) {
        return _updateProfileImage.apply(this, arguments);
      }

      return updateProfileImage;
    }()
    /**
     * Request new password
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "forgotPassword",
    value: function () {
      var _forgotPassword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(request, response) {
        var email, member, token;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                email = request.body.email;
                _context5.next = 3;
                return Member.getMember('email', email);

              case 3:
                member = _context5.sent;
                token = (0, _utils.generateToken)({
                  email: email
                }, '1h');

                _sendMail["default"].send({
                  to: email,
                  subject: 'Reset your Password',
                  template: member ? 'forgot-password' : 'no-account',
                  context: {
                    icon: process.env.APSON_ICON,
                    name: member ? member.name : '',
                    link: "".concat(process.env.ROOT, "/reset-password?token=").concat(token),
                    root: process.env.ROOT
                  }
                });

                return _context5.abrupt("return", _utils.Response.send(response, _constants.STATUS.OK, [], "A link to reset your password has been set to ".concat(email, ". Please check your email."), true));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function forgotPassword(_x10, _x11) {
        return _forgotPassword.apply(this, arguments);
      }

      return forgotPassword;
    }()
    /**
     * Reset password
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(request, response) {
        var email, password;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                email = response.locals.authValue.email;
                password = request.body.password;
                _context6.prev = 2;

                if (email) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return", _utils.Response.send(response, _constants.STATUS.UNATHORIZED, [], 'There was an issue verifying your account. You may need to send another request for a new password.', true));

              case 5:
                _context6.next = 7;
                return Member.update({
                  password: password
                }, {
                  where: {
                    email: email
                  }
                });

              case 7:
                return _context6.abrupt("return", _utils.Response.send(response, _constants.STATUS.CREATED, [], 'Password reset sucessful!', true));

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](2);
                return _context6.abrupt("return", MemberController.displayInsertError('Password reset failed!.', _context6.t0, response));

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 10]]);
      }));

      function resetPassword(_x12, _x13) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }()
    /**
     * Helper method to send insert or update error
     * @static
     * @param {string} title The title of the error message
     * @param {object} error The error object
     * @param {object} response The response object
     * @memberof MemberController
     */

  }, {
    key: "displayInsertError",
    value: function displayInsertError(title, error, response) {
      var errors = error.errors;
      var path = errors[0].path;
      var message = path === 'email' ? 'Email already exists' : 'Phone number already exists';

      _utils.Response.send(response, _constants.STATUS.UNPROCESSED, [{
        field: path,
        message: message
      }], "".concat(title, " ").concat(message, "."), false);
    }
  }]);

  return MemberController;
}();

var _default = MemberController;
exports["default"] = _default;