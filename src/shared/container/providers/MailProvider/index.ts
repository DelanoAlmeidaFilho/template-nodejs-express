import { container } from 'tsyringe';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { GmailProvider } from './implementations/GmailProvider';
import { IMailProvider } from './IMailProvider';

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    gmail: container.resolve(GmailProvider),
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    mailProvider[process.env.MAIL_PROVIDER],
);
