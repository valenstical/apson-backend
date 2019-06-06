import { validationResult, body } from 'express-validator/check';
import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';

const validateRequired = (field, message = 'This field is required') => body(field)
    .trim()
    .not()
    .isEmpty()
    .withMessage(message);

export const Validator = {
  validateLogin: [validateRequired('username'), validateRequired('password')],
};

export const handleValidation = (request, response, next) => {
  const errors = validationResult(request).formatWith(({ param, msg }) => ({
    field: param,
    message: msg,
  }));
  if (!errors.isEmpty()) {
    return Response.send(
      response,
      STATUS.BAD_REQUEST,
      errors.array({ onlyFirstError: true }),
      MESSAGE.VALIDATE_ERROR,
      false,
    );
  }
  next();
};
