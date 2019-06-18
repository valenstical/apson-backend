"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _randomInt = _interopRequireDefault(require("random-int"));

var _moment = _interopRequireDefault(require("moment"));

var _pdfcrowd = _interopRequireDefault(require("pdfcrowd"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _models = _interopRequireDefault(require("../database/models"));

var _sendMail = _interopRequireDefault(require("../helpers/sendMail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Member = _models["default"].Member,
    Payment = _models["default"].Payment;

var PaymentController =
/*#__PURE__*/
function () {
  function PaymentController() {
    _classCallCheck(this, PaymentController);
  }

  _createClass(PaymentController, null, [{
    key: "requestPayment",

    /**
     * Generates a paymentID and sends paystack data to user
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */
    value: function () {
      var _requestPayment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(request, response) {
        var id, member, paymentType;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = response.locals.authValue.id;
                _context.next = 3;
                return Member.getMember('id', id);

              case 3:
                member = _context.sent;
                paymentType = request.body.paymentType;
                return _context.abrupt("return", _utils.Response.send(response, _constants.STATUS.OK, {
                  ref: (0, _randomInt["default"])(100000000, 999999999),
                  key: process.env.PAYSTACK_PUBLIC_KEY,
                  email: member.email,
                  plan: process.env[paymentType]
                }, 'Payment details initiated', true));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function requestPayment(_x, _x2) {
        return _requestPayment.apply(this, arguments);
      }

      return requestPayment;
    }()
    /**
     * Process successful payment
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "processPayment",
    value: function () {
      var _processPayment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(request, response) {
        var _response$locals, id, _response$locals$paym, reference, amount, plan;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _response$locals = response.locals, id = _response$locals.authValue.id, _response$locals$paym = _response$locals.payment, reference = _response$locals$paym.reference, amount = _response$locals$paym.amount, plan = _response$locals$paym.plan;
                _context2.prev = 1;
                _context2.next = 4;
                return Payment.create({
                  id: reference,
                  amount: amount,
                  plan: plan,
                  memberId: id
                });

              case 4:
                _utils.Response.send(response, _constants.STATUS.OK, [], 'Payment successful', true);

                PaymentController.deliverValue(plan, {
                  reference: reference,
                  id: id
                });
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", _utils.Response.send(response, _constants.STATUS.FORBIDDEN, [], 'There was a problem processing your payment. Please contact us for assistance.', false));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function processPayment(_x3, _x4) {
        return _processPayment.apply(this, arguments);
      }

      return processPayment;
    }()
  }, {
    key: "deliverValue",
    value: function deliverValue(paymentType, data) {
      switch (paymentType) {
        case process.env.plan_membership_fee:
          return PaymentController.processMembershipSubscription(data);

        default:
      }
    }
  }, {
    key: "createPDF",
    value: function createPDF(html, reference, member) {
      var client = new _pdfcrowd["default"].HtmlToPdfClient(process.env.PDFCROWD_USERNAME, process.env.PDFCROWD_KEY);

      try {
        client.setPageSize('A4');
        client.setOrientation('portrait');
        client.setScaleFactor(67);
        client.setNoMargins(true);
      } catch (error) {// TODO
      }

      var path = "".concat(process.env.BASE_DIR, "/views/pdfs/").concat(reference, ".pdf");
      client.convertStringToFile(html, path, function (err) {
        PaymentController.mailCertificate(path, member);
      });
    }
  }, {
    key: "mailCertificate",
    value: function mailCertificate(path, member) {
      _sendMail["default"].send({
        to: member.email,
        template: 'welcome',
        subject: 'Welcome to APSON',
        attachments: [{
          filename: 'certificate.pdf',
          path: path
        }],
        context: {
          name: member.name
        }
      });
    }
  }, {
    key: "processMembershipSubscription",
    value: function () {
      var _processMembershipSubscription = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var reference, id, expiresAt, member, file, compiled, html;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                reference = _ref.reference, id = _ref.id;
                _context3.prev = 1;
                expiresAt = (0, _moment["default"])().add(1, 'years');
                _context3.next = 5;
                return Member.update({
                  expiresAt: expiresAt
                }, {
                  where: {
                    id: id
                  }
                });

              case 5:
                _context3.next = 7;
                return Member.getMember('id', id);

              case 7:
                member = _context3.sent;
                _context3.next = 10;
                return (0, _utils.readFile)('views/certificate.html');

              case 10:
                file = _context3.sent;
                compiled = _handlebars["default"].compile(file);
                html = compiled({
                  name: member.name,
                  date: (0, _moment["default"])().format('MMMM Do, YYYY'),
                  id: id,
                  reference: reference,
                  state: _constants.STATES[member.state],
                  expiresAt: (0, _moment["default"])(expiresAt, 'YYYY-MM-DD').format('MMMM Do, YYYY')
                });
                PaymentController.createPDF(html, reference, member);
                _context3.next = 18;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](1);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 16]]);
      }));

      function processMembershipSubscription(_x5) {
        return _processMembershipSubscription.apply(this, arguments);
      }

      return processMembershipSubscription;
    }()
  }]);

  return PaymentController;
}();

var _default = PaymentController;
exports["default"] = _default;