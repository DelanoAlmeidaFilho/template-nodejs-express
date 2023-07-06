import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import { IMailProvider } from '../IMailProvider';
import handlebars from 'handlebars';
import { injectable } from 'tsyringe';

@injectable()
class GmailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string,
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8');

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        await this.client.sendMail({
            to,
            from: process.env.APP_NAME,
            subject,
            html: templateHTML,
        });
    }
}

export { GmailProvider };
