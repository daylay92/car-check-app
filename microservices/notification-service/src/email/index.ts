import { EmailData } from '../interfaces/email.interface';
import * as sendGrid from '@sendgrid/mail';
import * as Mailgen from 'mailgen';
import { mailTemplate } from './email.template';
import config from '../config/env';

export const sendMail = async (data: EmailData): Promise<void> => {
  sendGrid.setApiKey(config()['SENDGRID_API_KEY']);
  const mailGen = new Mailgen({
    theme: 'cerberus',
    product: {
      name: 'AutoCheck',
      link: 'https://google.com',
    },
  });
  const mail = {
    to: data.email,
    from: config()['SENDGRID_EMAIL'],
    subject: 'Your Purchase Has Been Completed',
    html: mailGen.generate(
      mailTemplate(data.firstName, data.vin, data.carModel, data.make),
    ),
  };
  await sendGrid.send(mail);
};
