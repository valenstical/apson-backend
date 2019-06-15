import bcrypt from 'bcryptjs';
import Random from 'random-int';

import { Response, generateToken } from '../helpers/utils';
import { STATUS } from '../helpers/constants';
import models from '../database/models';

const {
  Member,
  Sequelize: { Op },
} = models;

class MemberController {
  /**
   * Login a user
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async login(request, response, next) {
    const { username, password } = request.body;
    const encryptedPassword = bcrypt.hashSync(password, process.env.SECRET_KEY);

    try {
      let result = await Member.findOne({
        where: {
          [Op.or]: {
            email: username,
            phone: username,
          },
          password: encryptedPassword,
        },
        attributes: {
          exclude: ['password'],
        },
      });
      const status = result !== null;
      let code = STATUS.UNATHORIZED;
      let message = 'Your log in credentials are invalid.';

      if (status) {
        result = result.dataValues;
        result.token = generateToken({ id: result.id });
        code = STATUS.OK;
        message = 'Log in  successful!';
      }
      Response.send(response, code, result, message, status);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Register or update a user
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async register(request, response, next) {
    const { body } = request;
    try {
      body.id = Random(100000000, 999999999);
      const { dataValues } = await Member.create(body);
      delete dataValues.password;
      dataValues.token = generateToken({ id: dataValues.id });
      Response.send(response, STATUS.CREATED, dataValues, 'Registration sucessful!', true);
    } catch (error) {
      const { errors } = error;
      const { path } = errors[0];
      const message = path === 'email' ? 'Email already exists' : 'Phone number already exists';
      Response.send(
        response,
        STATUS.UNPROCESSED,
        [
          {
            field: path,
            message,
          },
        ],
        `Registration failed. ${message}.`,
        false,
      );
    }
  }
}

  /**
   * Checks if a member exist
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async memberExists(request, response, next) {
    const { username, password } = request.body;
    const encryptedPassword = bcrypt.hashSync(password, process.env.SECRET_KEY);

    try {
      let result = await Member.findOne({
        where: {
          [Op.or]: {
            email: username,
            phone: username,
          },
          password: encryptedPassword,
        },
        attributes: {
          exclude: ['password'],
        },
      });
      const status = result !== null;
      let code = STATUS.UNATHORIZED;
      let message = 'Your log in credentials are invalid.';

      if (status) {
        result = result.dataValues;
        result.token = generateToken({ id: result.id });
        code = STATUS.OK;
        message = 'Log in  successful!';
      }
      Response.send(response, code, result, message, status);
    } catch (error) {
      next(error);
    }
  }

export default MemberController;
