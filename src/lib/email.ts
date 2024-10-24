import {
  RegisterEmailModel,
  SendEmailModel,
  EmailRecipient,
  EmailSender,
  EmailContent,
  SendEmailResponse,
  RegisterEmailResponse,
  RegisterDomainModel,
  VerifyDomainModel,
  EmailApi,
  RegisterDomainResponse,
} from '../internal/api';
import { AuthAPI } from './auth';
import JunoError from './errors';
import { validateEmailContent, validateEmailRecipient, validateEmailSender, validateString } from './validators';

export class EmailAPI {
  private internalApi: EmailApi;
  private auth?: AuthAPI;
  constructor(baseURL?: string, auth?: AuthAPI) {
    this.internalApi = new EmailApi(baseURL);
    this.auth = auth;
    this.internalApi.accessToken = this.auth?.junoApiKey;
  }
  async sendEmail(options: {
    recipients: Array<EmailRecipient>;
    cc?: Array<EmailRecipient>;
    bcc?: Array<EmailRecipient>;
    sender: EmailSender;
    subject: string;
    contents: Array<EmailContent>;
  }): Promise<SendEmailResponse> {
    const { recipients, cc, bcc, sender, contents } = options;
    if (!recipients || !sender || !contents) {
      throw new JunoError(
        'Parameter recipients or sender or content cannot be null'
      );
    }
    if (recipients.length === 0 || contents.length === 0) {
      throw new JunoError(
        'Parameter recipients or content cannot be an empty array'
      );
    }
    recipients.forEach((recipient) => validateEmailRecipient(recipient));
    contents.forEach((content) => validateEmailContent(content));
    validateEmailSender(sender);

    try {
      const sendEmailModel = new SendEmailModel();
      sendEmailModel.recipients = recipients;
      sendEmailModel.sender = sender;
      sendEmailModel.content = contents;
      sendEmailModel.cc = cc ?? [];
      sendEmailModel.bcc = bcc ?? [];
      sendEmailModel.subject = options.subject;

      const result = await this.internalApi.emailControllerSendEmail(
        sendEmailModel,
        {
          headers: {
            Authorization: `Bearer ${this.auth.junoApiKey}`,
          },
        }
      );
      return result.body;
    } catch (e) {
      throw new JunoError(e);
    }
  }
  async registerSenderAddress(options: {
    email: string;
    name: string;
    replyTo: string | undefined;
  }): Promise<RegisterEmailResponse> {
    let { email, name, replyTo } = options;

    validateString(email, 'Email cannot be null or empty string');

    try {
      const registerEmailModel = new RegisterEmailModel();
      registerEmailModel.email = email;
      registerEmailModel.name = name;
      registerEmailModel.replyTo = replyTo;

      const result =
        await this.internalApi.emailControllerRegisterSenderAddress(
          registerEmailModel,
          {
            headers: {
              Authorization: `Bearer ${this.auth.junoApiKey}`,
            },
          }
        );
      return result.body;
    } catch (e) {
      throw new JunoError(e);
    }
  }
  async registerDomain(options: {
    domain: string;
    subdomain: string | undefined;
  }): Promise<RegisterDomainResponse> {
    const { domain, subdomain } = options;

    validateString(domain, 'Domain cannot be null or empty string');

    try {
      const registerDomainModel = new RegisterDomainModel();
      registerDomainModel.domain = domain;
      registerDomainModel.subdomain = subdomain;

      const result = await this.internalApi.emailControllerRegisterEmailDomain(
        registerDomainModel,
        {
          headers: {
            Authorization: `Bearer ${this.auth.junoApiKey}`,
          },
        }
      );
      return result.body;
    } catch (e) {
      throw new JunoError(e);
    }
  }
  async verifyDomain(options: {
    domain: string;
  }): Promise<RegisterDomainResponse> {
    const { domain } = options;

    validateString(domain, 'Domain cannot be null or empty string');

    try {
      const verifyDomainModel = new VerifyDomainModel();
      verifyDomainModel.domain = domain;

      const result = await this.internalApi.emailControllerVerifySenderDomain(
        verifyDomainModel,
        {
          headers: {
            Authorization: `Bearer ${this.auth.junoApiKey}`,
          },
        }
      );
      return result.body;
    } catch (e) {
      throw new JunoError(e);
    }
  }
}

