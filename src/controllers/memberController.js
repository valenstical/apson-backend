/* eslint-disable no-unused-vars */

import bcrypt from 'bcryptjs';

import { Response } from '../helpers/utils';
import { STATUS } from '../helpers/constants';
import models from '../database/models';

const { Member } = models;

class MemberController {
  static async login(request, response, next) {
    const { username, password } = request.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
      const result = await Member.findOne({
        where: { username, encryptedPassword }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default MemberController;
