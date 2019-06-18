"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _validator = require("../middleware/validator");

var _memberController = _interopRequireDefault(require("../controllers/memberController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Login member


router.post('/login', _validator.Validator.validateLogin, _validator.handleValidation, _memberController["default"].login); // Register a new member

router.post('/', _validator.Validator.validateRegistration, _validator.handleValidation, _memberController["default"].registerMember); // Update member details

router.patch('/', _validator.Validator.validateToken, _validator.Validator.validateMemberDetails, _validator.handleValidation, _memberController["default"].updateMember); // Update member profile image

router.patch('/image', _validator.Validator.validateToken, _validator.Validator.validateImage, _validator.handleValidation, _memberController["default"].updateProfileImage); // Request new password

router.post('/forgot_password', _validator.Validator.validateEmail, _validator.handleValidation, _memberController["default"].forgotPassword); // Reset password

router.patch('/reset_password', _validator.Validator.validateToken, _validator.Validator.validateResetPassword, _validator.handleValidation, _memberController["default"].resetPassword);
var _default = router;
exports["default"] = _default;