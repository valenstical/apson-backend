"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleValidation = exports.Validator = void 0;

var _check = require("express-validator/check");

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _authenticate = _interopRequireDefault(require("./authenticate"));

var _paystack = _interopRequireDefault(require("./paystack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var validateRequired = function validateRequired(field) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'This field is required';
  return (0, _check.body)(field).trim().not().isEmpty().withMessage(message);
};

var validateEmpty = function validateEmpty(field) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'This field is required';
  return (0, _check.body)(field).not().isEmpty().withMessage(message);
};

var validateEmail = function validateEmail() {
  return (0, _check.body)('email').trim().isEmail().withMessage('Enter a valid email');
};

var validatePhone = function validatePhone() {
  return (0, _check.body)('phone').trim().isMobilePhone(['en-NG']).withMessage('Enter a valid mobile phone number');
};

var validateState = function validateState() {
  return (0, _check.body)('state').trim().isInt().withMessage('Choose a state').isInt({
    min: 0,
    max: 36
  }).withMessage('Choose a state');
};

var validateSex = function validateSex() {
  return (0, _check.body)('sex').trim().isIn(['Male', 'Female']).withMessage('Choose a sex');
};

var validatePaymentType = function validatePaymentType() {
  return (0, _check.body)('paymentType').trim().isIn([_constants.PAYMENT_TYPE.MEMBERSHIP, _constants.PAYMENT_TYPE.STUDENT]).withMessage("Payment type should be either ".concat(_constants.PAYMENT_TYPE.MEMBERSHIP, " or ").concat(_constants.PAYMENT_TYPE.STUDENT, "."));
};

var validateUrl = function validateUrl() {
  var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'url';
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Enter a valid url';
  return (0, _check.body)(field).trim().isURL().withMessage(message);
};

var validateMemberDetails = [validateRequired('name'), validateState(), validateEmail(), validateSex(), validatePhone()];

var validateComparison = function validateComparison(field1, field2) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Passwords do not match.';
  return [(0, _check.body)(field1).not().isEmpty().withMessage('This field is required'), (0, _check.body)(field2).not().isEmpty().withMessage('This field is required').custom(function (password, _ref) {
    var req = _ref.req;

    if (password !== req.body[field1]) {
      throw new Error(message);
    } else {
      return password;
    }
  })];
};

var Validator = {
  validateLogin: [validateRequired('username'), validateEmpty('password')],
  validateRegistration: [].concat(validateMemberDetails, [validateEmpty('password')]),
  validateMemberDetails: validateMemberDetails,
  validateToken: _authenticate["default"],
  validateImage: [validateUrl('url', 'Image url invalid')],
  validateEmail: [validateEmail()],
  validateResetPassword: _toConsumableArray(validateComparison('password', 'confirm_password')),
  validatePaymentType: [validatePaymentType()],
  validatePaymentRef: [validateEmpty('ref', 'The payment reference code is required.')],
  verifyPayment: _paystack["default"].verifyPayment
};
exports.Validator = Validator;

var handleValidation = function handleValidation(request, response, next) {
  var errors = (0, _check.validationResult)(request).formatWith(function (_ref2) {
    var param = _ref2.param,
        msg = _ref2.msg;
    return {
      field: param,
      message: msg
    };
  });

  if (!errors.isEmpty()) {
    return _utils.Response.send(response, _constants.STATUS.BAD_REQUEST, errors.array({
      onlyFirstError: true
    }), _constants.MESSAGE.VALIDATE_ERROR, false);
  }

  next();
};

exports.handleValidation = handleValidation;