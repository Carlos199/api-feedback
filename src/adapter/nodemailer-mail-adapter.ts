import { MailAdapter, SendMailData } from "./mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c9c0a493836f8f",
      pass: "77213f48a0486d"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: 'Equipo Feedget <oi@feedget.com>',
            to: 'Luis Ortellado <luis@gmail.com>',
            subject,
            html: body
        })
    }
}