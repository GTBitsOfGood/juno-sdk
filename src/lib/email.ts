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
  SetupEmailServiceModel,
  SetupEmailResponse,
} from '../internal/api';
import { AuthAPI } from './auth';
import { JunoValidationError } from './errors';
import {
  validateEmailContent,
  validateEmailRecipient,
  validateEmailSender,
  validateString,
} from './validators';

export class EmailAPI {
  private internalApi: EmailApi;
  private auth?: AuthAPI;
  constructor(baseURL?: string, auth?: AuthAPI) {
    this.internalApi = new EmailApi(baseURL);
    this.auth = auth;
    this.internalApi.accessToken = this.auth?.junoApiKey;
  }

  async setupEmail(
    options: SetupEmailServiceModel
  ): Promise<SetupEmailResponse> {
    const { sendgridKey } = options;

    validateString(sendgridKey, 'Invalid SendGrid key provided');

    // SendGrid keys always start with "SG.<>", this will help a few people
    // who accidentally plug in their API key (this has already happened)
    if (!sendgridKey.startsWith('SG')) {
      throw new JunoValidationError(
        'Invalid SendGrid key format. The key should start with SG'
      );
    }

    const result = await this.internalApi.emailControllerSetup(options, {
      headers: {
        Authorization: `Bearer ${this.auth.junoApiKey}`,
      },
    });

    return result.body;
  }

  async sendEmail(options: {
    recipients?: Array<EmailRecipient>;
    cc?: Array<EmailRecipient>;
    bcc?: Array<EmailRecipient>;
    replyToList?: Array<EmailRecipient>;
    sender: EmailSender;
    subject: string;
    contents: Array<EmailContent>;
  }): Promise<SendEmailResponse> {
    const { recipients, cc, bcc, sender, contents, replyToList } = options;
    if (!sender || !contents) {
      throw new JunoValidationError(
        'Parameter recipients or sender or content cannot be null'
      );
    }

    if (
      (!recipients || recipients.length === 0) &&
      (!cc || cc.length === 0) &&
      (!bcc || bcc.length === 0)
    ) {
      throw new JunoValidationError(
        'Email request must have at least one recipient, cc, or bcc.'
      );
    }

    if (contents.length === 0) {
      throw new JunoValidationError(
        'Parameter contents cannot be an empty array'
      );
    }
    recipients.forEach((recipient) => validateEmailRecipient(recipient));
    contents.forEach((content) => validateEmailContent(content));
    validateEmailSender(sender);

    try {
      const sendEmailModel = new SendEmailModel();
      sendEmailModel.sender = sender;
      sendEmailModel.content = contents;
      sendEmailModel.recipients = recipients ?? [];
      sendEmailModel.replyToList = replyToList ?? [];
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
      throw e;
    }
  }
  async registerSenderAddress(options: {
    email: string;
    name: string;
    replyTo: string | undefined;
    nickname: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }): Promise<RegisterEmailResponse> {
    let { email, name, replyTo, nickname, address, city, state, zip, country } =
      options;

    validateString(email);
    validateString(name);
    validateString(nickname);
    validateString(address);
    validateString(city);
    validateString(state);
    validateString(zip);
    validateString(country);

    replyTo =
      typeof replyTo === 'string' && replyTo.trim().length > 0
        ? replyTo
        : email;

    try {
      const registerEmailModel = new RegisterEmailModel();
      registerEmailModel.email = email;
      registerEmailModel.name = name;
      registerEmailModel.replyTo = replyTo;
      registerEmailModel.address = address;
      registerEmailModel.nickname = nickname;
      registerEmailModel.zip = zip;
      registerEmailModel.city = city;
      registerEmailModel.state = state;
      registerEmailModel.country = country;

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
      throw e;
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
      throw e;
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
      throw e;
    }
  }
}
