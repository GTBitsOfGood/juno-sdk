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
      throw new Error(
        'Parameter recipients or sender or content cannot be null'
      );
    }
    if (recipients.length === 0 || contents.length === 0) {
      throw new Error(
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
      throw new Error(e);
    }
  }
  async registerSenderAddress(options: {
    email: string;
    name: string;
    replyTo: string | undefined;
  }): Promise<RegisterEmailResponse> {
    let { email, name, replyTo } = options;
    if (!email || email.trim().length === 0) {
      throw new Error('Email cannot be null or empty string');
    }
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
      throw new Error(e);
    }
  }
  async registerDomain(options: {
    domain: string;
    subdomain: string | undefined;
  }): Promise<RegisterDomainResponse> {
    const { domain, subdomain } = options;
    if (!domain || domain.trim().length === 0) {
      throw new Error('Domain cannot be null or empty string');
    }

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
      throw new Error(e);
    }
  }
  async verifyDomain(options: {
    domain: string;
  }): Promise<RegisterDomainResponse> {
    const { domain } = options;
    if (!domain || domain.trim().length === 0) {
      throw new Error('Domain cannot be null or empty string');
    }

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
      throw new Error(e);
    }
  }
}

const validateEmailRecipient = (recipient: EmailRecipient) => {
  if (!recipient) {
    throw new Error('Recipient cannot be null');
  }
  if (!recipient.email || recipient.email.trim().length === 0) {
    throw new Error('Recipient email cannot be null or empty string');
  }
  if (!recipient.name && recipient.name.trim().length === 0) {
    throw new Error('Recipient name cannot be empty string');
  }
};

const validateEmailSender = (sender: EmailSender) => {
  if (!sender) {
    throw new Error('Sender cannot be null');
  }
  if (!sender.email || sender.email.trim().length === 0) {
    throw new Error('Sender email cannot be null or empty string');
  }
  if (!sender.name && sender.name.trim().length === 0) {
    throw new Error('Sender name cannot be empty string');
  }
};

const validateEmailContent = (content: EmailContent) => {
  if (!content) {
    throw new Error('Content cannot be null');
  }
  if (!content.type || content.type.trim().length === 0) {
    throw new Error('Content type cannot be null or empty string');
  }
  if (!content.value || content.value.trim().length === 0) {
    throw new Error('Content value cannot be null or empty string');
  }
};
