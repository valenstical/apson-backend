import bcrypt from 'bcryptjs';

import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';
import models from '../database/models';

const {
  Member,
  Sequelize: { Op },
} = models;

class MemberController {
  static async login(request, response, next) {
    const { username, password } = request.body;
    const encryptedPassword = bcrypt.hashSync(password, process.env.SECRET_KEY);

    try {
      const result = await Member.findOne({
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
      const code = status ? STATUS.OK : STATUS.UNATHORIZED;
      const message = status
        ? 'Log in  successful!'
        : 'Your log in credentials are invalid.';
      Response.send(response, code, result, message, status);
    } catch (error) {
      next(error);
    }
  }
}

export default MemberController;
