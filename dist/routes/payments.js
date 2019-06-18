"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _validator = require("../middleware/validator");

var _paymentController = _interopRequireDefault(require("../controllers/paymentController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Request payment


router.get('/request', _validator.Validator.validateToken, _validator.Validator.validatePaymentType, _validator.handleValidation, _paymentController["default"].requestPayment); // Request authentication

router.post('/', _validator.Validator.validateToken, _validator.Validator.validatePaymentRef, _validator.handleValidation, _validator.Validator.verifyPayment, _paymentController["default"].processPayment);
var _default = router;
exports["default"] = _default;