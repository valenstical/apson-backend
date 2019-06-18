import Random from 'random-int';
import { Response } from '../helpers/utils';
import { STATUS, STATE_CODES } from '../helpers/constants';
import models from '../database/models';


const { Registration } = models;

class RegistrationController {
  static async register(request, response) {
    const { body } = request;
    try {
      body.id = `${STATE_CODES[body.state]}${Random(100000, 999999)}`;
      const { dataValues } = await Registration.create(body);
      return Response.send(response, STATUS.CREATED, dataValues, 'Registration sucessful!', true);
    } catch (error) {
      return Response.send(response, STATUS.SERVER_ERROR, [], 'Registration failed. Please try again later or contact support for further assistance.');
    }
  }
}

export default RegistrationController;
