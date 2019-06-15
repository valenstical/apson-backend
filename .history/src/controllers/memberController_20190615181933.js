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
   * Register  a user
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async registerMember(request, response) {
    const { body } = request;
    try {
      body.id = Random(100000000, 999999999);
      const { dataValues } = await Member.create(body);
      delete dataValues.password;
      dataValues.token = generateToken({ id: dataValues.id });
      Response.send(response, STATUS.CREATED, dataValues, 'Registration sucessful!', true);
    } catch (error) {
      MemberController.displayInsertError('Registration failed.', error, response);
    }
  }

  /**
   * Update a user
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async updateMember(request, response) {
    const { memberId } = response.locals;
    try {
      await Member.update(request.body, { where: { id: memberId } });
      Response.send(response, STATUS.CREATED, [], 'Update sucessful!', true);
    } catch (error) {
      MemberController.displayInsertError('Update member details failed.', error, response);
    }
  }

  /**
   * Update profile image
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async updateProfileImage(request, response) {
    const { memberId } = response.locals;
    const { url } = request.body;
    try {
      await Member.update({ image: url }, { where: { id: memberId } });
      Response.send(response, STATUS.CREATED, [], 'Update sucessful!', true);
    } catch (error) {
      MemberController.displayInsertError('Update member details failed.', error, response);
    }
  }

  /**
   * Helper method to send insert or update error
   * @static
   * @param {string} title The title of the error message
   * @param {object} error The error object
   * @param {object} response The response object
   * @memberof MemberController
   */
  static displayInsertError(title, error, response) {
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
      `${title} ${message}.`,
      false,
    );
  }

  /**
   * Get a member details if it exist
   * @param {string} column Column to check against
   * @param {string} value Value to lookup
   * @returns {object} The user details if found, null
   */
  static async getMember(column, value) {
    let result = null;
    try {
      const { dataValues } = await Member.findOne({
        where: {
          [column]: value,
        },
        attributes: {
          exclude: ['password'],
        },
      });
      result = dataValues;
    } catch (error) {
      // TODO
    }
    return result;
  }
}
export default MemberController;
