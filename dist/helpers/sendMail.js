"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mailer =
/*#__PURE__*/
function () {
  function Mailer() {
    _classCallCheck(this, Mailer);
  }

  _createClass(Mailer, null, [{
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var to, subject, template, context, attachments, smtp, content, file, transport, compiled;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                to = _ref.to, subject = _ref.subject, template = _ref.template, context = _ref.context, attachments = _ref.attachments;
                smtp = {
                  host: process.env.EMAIL_HOST,
                  port: process.env.EMAIL_PORT,
                  auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD
                  }
                };
                content = {
                  from: process.env.EMAIL_ADDRESS,
                  replyTo: process.env.EMAIL_ADDRESS,
                  to: to,
                  subject: subject,
                  attachments: attachments
                };
                _context.prev = 3;
                _context.next = 6;
                return (0, _utils.readFile)("views/".concat(template, ".html"));

              case 6:
                file = _context.sent;
                transport = _nodemailer["default"].createTransport(smtp);
                compiled = _handlebars["default"].compile(file);
                content.html = compiled(context);
                transport.sendMail(content, function (err, info) {});
                _context.next = 15;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](3);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 13]]);
      }));

      function send(_x) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }]);

  return Mailer;
}();

var _default = Mailer;
exports["default"] = _default;