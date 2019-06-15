import jwt from 'jsonwebtoken';
import { MESSAGE, STATUS } from './constants';

export class Response {
  static send(
    response,
    code = STATUS.OK,
    data = [],
    message = MESSAGE.SUCCESS_MESSAGE,
    status = true,
  ) {
    return response.status(code).json({
      code,
      data,
      message,
      status,
      timestamp: new Date().getTime(),
    });
  }
}

export const validatorFormater = ({ param, msg }) => ({
  field: param,
  message: msg,
});

export const generateToken = (payload, expiresIn = '365d') => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });

export default {};
