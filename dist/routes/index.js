"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _members = _interopRequireDefault(require("./members"));

var _schools = _interopRequireDefault(require("./schools"));

var _payments = _interopRequireDefault(require("./payments"));

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/members', _members["default"]);
router.use('/schools', _schools["default"]);
router.use('/payments', _payments["default"]);
router.all('*', function (request, response) {
  _utils.Response.send(response, _constants.STATUS.NOT_FOUND, [], _constants.MESSAGE.NOT_FOUND, false);
});
var _default = router;
exports["default"] = _default;