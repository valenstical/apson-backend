import { Response } from '../helpers/utils';
import { STATUS } from '../helpers/constants';
import Mailer from '../helpers/sendMail';
import models from '../database/models';

const { Contact } = models;

class ContactController {
  /**
   * Forwards contact message to the relevant email addresss
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async sendMessage(request, response) {
    const {
      email, phone, subject, name, message, receiver
    } = request.body;

    const template = `
    Someone just made an enquiry about your school.\n
    Please respond via mail or phone. The user details are listed below\n
    Name: ${name}\n
    Email: ${email}\n
    Phone: ${phone}\n
    message: ${message}\n
    `;

    try {
      const result = await Contact.create(request.body);
      Response.send(response, STATUS.OK, result, 'Message sent sucessfully', true);
      return Mailer.send({
        to: receiver,
        subject: `New enquiry on your school page - ${subject}`,
        template,
        context: null,
        attachments: null,
        replyTo: `"${name}" <${email}>`
      });
    } catch (error) {
      return Response.send(
        response,
        STATUS.SERVER_ERROR,
        null,
        'Your message could not be sent. Please try again later.',
        false,
      );
    }
  }
}

export default ContactController;
