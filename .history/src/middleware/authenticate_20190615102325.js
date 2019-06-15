import jwt from 'jsonwebtoken';
import { STATUS, MESSAGE } from '../helpers/constants';
import { Response } from '../helpers/utils';

const displayError = (response) => {
  Response.send(response, STATUS.UNATHORIZED, [], MESSAGE.UNATHORIZED_ACCESS, false);
};

const validateToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) return displayError(response);

  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (error, value) => {
    const { id } = value;
    if (error || !memberId) return displayError(response);
    console.log(memberId);
    response.locals.memberId = memberId;
    next();
  });
};

export default validateToken;
