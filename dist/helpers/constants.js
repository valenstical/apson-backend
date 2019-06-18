"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PAYMENT_TYPE = exports.MESSAGE = exports.STATUS = exports.STATES = exports.STATE_CODES = void 0;

var _states = require("./states");

var STATE_CODES = _states.listOfStateCodes;
exports.STATE_CODES = STATE_CODES;
var STATES = _states.listOfStates;
exports.STATES = STATES;
var STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNATHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSED: 422,
  SERVER_ERROR: 500
};
exports.STATUS = STATUS;
var MESSAGE = {
  SERVER_ERROR: 'An internal error has occured. This is not your fault. We are working to fix this problem. Please try again later.',
  NOT_FOUND: 'Resource not found',
  UNATHORIZED_ACCESS: 'You do not have permission to access that resource',
  INVALID_CREDENTIALS: 'Invalid user credentials',
  CREATE_SUCCESS: 'Successfully created',
  UPDATE_SUCCESS: 'Successfully updated',
  VALIDATE_ERROR: 'There was a problem with your request, please check the values you entered.',
  SUCCESS_MESSAGE: 'Operation was successful',
  FAILURE_MESSAGE: 'Operation failed'
};
exports.MESSAGE = MESSAGE;
var PAYMENT_TYPE = {
  MEMBERSHIP: 'plan_membership_fee',
  STUDENT: 'plan_student_fee'
};
exports.PAYMENT_TYPE = PAYMENT_TYPE;
var _default = {};
exports["default"] = _default;