import { STATUS } from './constants';

export class Response {
  static send(
    response,
    code = STATUS.OK,
    data = [],
    message = '',
    status = true
  ) {
    return response.status(code).json({
      code,
      data,
      message,
      status
    });
  }
}

export const validatorFormater = ({ param, msg }) => ({
  field: param,
  message: msg
});

export default {};
