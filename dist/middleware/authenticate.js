"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _constants = require("../helpers/constants");

var _utils = require("../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var displayError = function displayError(response) {
  _utils.Response.send(response, _constants.STATUS.UNATHORIZED, [], _constants.MESSAGE.UNATHORIZED_ACCESS, false);
};

var validateToken = function validateToken(request, response, next) {
  var authorization = request.headers.authorization;
  if (!authorization) return displayError(response);
  var token = authorization.split(' ')[1];

  _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (error, value) {
    if (error) return displayError(response);
    if (error || !value) return displayError(response);
    response.locals.authValue = value;
    next();
  });
};

var _default = validateToken;
exports["default"] = _default;