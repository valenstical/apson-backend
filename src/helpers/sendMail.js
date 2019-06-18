import mailer from 'nodemailer';
import Handlebars from 'handlebars';
import { readFile } from './utils';

class Mailer {
  static async send({
    to, replyTo, subject, template, context, attachments
  }) {
    const smtp = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
    const content = {
      from: `"APSON" <${process.env.EMAIL_ADDRESS}>`,
      replyTo: replyTo || process.env.EMAIL_ADDRESS,
      to,
      subject,
      attachments,
    };
    try {
      if (context) {
        const file = await readFile(`views/${template}.html`);
        const compiled = Handlebars.compile(file);
        content.html = compiled(context);
      } else {
        content.text = template;
      }
      const transport = mailer.createTransport(smtp);
      transport.sendMail(content, (err, info) => {});
    } catch (error) {
      // TODO
    }
  }
}

export default Mailer;
