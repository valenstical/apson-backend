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

router.post('/', _validator.Validator.validateRegistration, _validator.handleValidation, _memberController["default"].registerMember);
var _default = router;
exports["default"] = _default;