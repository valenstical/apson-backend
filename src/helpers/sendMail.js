
import mailer from 'nodemailer';
import smptTransport from 'nodemailer-smtp-transport';
import handleBar from 'nodemailer-express-handlebars';

class Mailer {
  static send(to, subject, message) {
    const smtp = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
    const content = {
      from: process.env.EMAIL_ADDRESS,
      replyTo: process.env.EMAIL_ADDRESS,
      to,
      subject,
      html: message,
    };
    const transport = mailer.createTransport(smptTransport(smtp));
    transport.use('compile', handleBar({
      viewEngine: {
        extName: '.hbs',
        layoutsDir: 'views',
      },
      viewPath: 'views',
      extName: '.hbs'
    }));

    transport.sendMail(content, (err, info) => {
    });
  }
}

export default Mailer;
