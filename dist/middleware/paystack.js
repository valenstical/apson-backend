"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var displayError = function displayError(response) {
  _utils.Response.send(response, _constants.STATUS.FORBIDDEN, [], 'We could not verify your payment. Please try again or contact us for assistance.', false);
};

var Paystack =
/*#__PURE__*/
function () {
  function Paystack() {
    _classCallCheck(this, Paystack);
  }

  _createClass(Paystack, null, [{
    key: "verifyPayment",
    value: function () {
      var _verifyPayment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(request, response, next) {
        var ref, options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ref = request.body.ref;
                options = {
                  uri: "https://api.paystack.co/transaction/verify/".concat(ref),
                  headers: {
                    Authorization: "Bearer ".concat(process.env.PAYSTACK_SECRET_KEY)
                  },
                  json: true
                };
                (0, _requestPromise["default"])(options).then(function (result) {
                  var _result$data = result.data,
                      status = _result$data.status,
                      reference = _result$data.reference,
                      amount = _result$data.amount,
                      plan = _result$data.plan;

                  if (status !== 'success') {
                    return displayError(response);
                  }

                  response.locals.payment = {
                    reference: reference,
                    amount: amount,
                    plan: plan
                  };
                  next();
                }, function (error) {
                  return displayError(response);
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function verifyPayment(_x, _x2, _x3) {
        return _verifyPayment.apply(this, arguments);
      }

      return verifyPayment;
    }()
  }]);

  return Paystack;
}();

exports["default"] = Paystack;