import { validationResult, body } from 'express-validator/check';
import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';
import validateToken from './authenticate';
import MemberController from '../controllers/memberController';

const validateRequired = (field, message = 'This field is required') => body(field)
  .trim()
  .not()
  .isEmpty()
  .withMessage(message);

const validateEmail = () => body('email')
  .trim()
  .isEmail()
  .withMessage('Enter a valid email');

const validatePhone = () => body('phone')
  .trim()
  .isMobilePhone()
  .withMessage('Enter a valid mobile phone number');

const validateState = () => body('state')
  .trim()
  .isInt()
  .withMessage('Choose a state')
  .isInt({ min: 0, max: 36 })
  .withMessage('Choose a state');

const validateSex = () => body('sex')
  .trim()
  .isIn(['Male', 'Female'])
  .withMessage('Choose a sex');

const validateMemberDetails = [
  validateRequired('name'),
  validateState(),
  validateEmail(),
  validateSex(),
  validatePhone(),
];

export const Validator = {
  validateLogin: [validateRequired('username'), validateRequired('password')],
  validateRegistration: [...validateMemberDetails, validateRequired('password')],
  validateMemberDetails,
  validateToken,
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
