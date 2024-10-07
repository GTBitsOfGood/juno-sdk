import { EmailRecipient, EmailSender, EmailContent, SendEmailResponse, RegisterEmailResponse, RegisterDomainResponse } from '../internal/api';
import { AuthAPI } from './auth';
export declare class EmailAPI {
    private internalApi;
    private auth?;
    constructor(baseURL?: string, auth?: AuthAPI);
    sendEmail(options: {
        recipients: Array<EmailRecipient>;
        cc: Array<EmailRecipient>;
        bcc: Array<EmailRecipient>;
        sender: EmailSender;
        contents: Array<EmailContent>;
    }): Promise<SendEmailResponse>;
    registerSenderAddress(options: {
        email: string;
        name: string;
        replyTo: string | undefined;
    }): Promise<RegisterEmailResponse>;
    registerDomain(options: {
        domain: string;
        subdomain: string | undefined;
    }): Promise<RegisterDomainResponse>;
    verifyDomain(options: {
        domain: string;
    }): Promise<RegisterDomainResponse>;
}
