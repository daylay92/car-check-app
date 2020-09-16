import { EmailData} from '../interfaces/email.interface'
import sendGrid from '@sendgrid/mail';
import MailGen from 'mailgen';
import { mailTemplate } from './email.template';
import config from '../config/env';


export const sendMail = async(data: EmailData): Promise<unknown>=> {
    const mailGen = new MailGen({
        theme: 'cerberus',
    product: {
        name: 'AutoCheck',
        link: 'https://google.com'
    }
    })
    sendGrid.setApiKey(config()['SENDGRID_API_KEY']);
    const mail = {
    to: data.email,
    from: 'admin@carcheck.com',
    subject: 'Your Purchase Has Been Completed',
    html: mailGen.generate(mailTemplate(data.firstName, data.vin, data.carModel, data.make))

}
return sendGrid.send(mail)
}