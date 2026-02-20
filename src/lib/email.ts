import {
  EmailApi,
  Configuration,
  EmailConfigResponse,
  EmailContent,
  EmailRecipient,
  EmailSenderSendEmailModel,
  RegisterDomainModel,
  RegisterDomainResponse,
  RegisterEmailModel,
  RegisterEmailResponse,
  SendEmailModel,
  SendEmailResponse,
  SetupEmailResponse,
  SetupEmailServiceModel,
  VerifyDomainModel,
} from '../internal/index';
import { ApiCredentials } from './apiCredentials';
import { AuthAPI } from './auth';
import { JunoValidationError } from './errors';
import {
  validateEmailContent,
  validateEmailRecipient,
  validateEmailSender,
  validateSendGridKey,
  validateString,
} from './validators';

export class EmailAPI {
  private internalApi: EmailApi;
  private auth?: AuthAPI;
  constructor(baseURL?: string, auth?: AuthAPI) {
    this.auth = auth;
    this.internalApi = new EmailApi(new Configuration({ basePath: baseURL, accessToken: auth?.junoApiKey }));
  }

  async getEmailConfig(
    projectId: string,
    credentials?: ApiCredentials
  ): Promise<EmailConfigResponse> {
    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.emailControllerGetEmailConfigById(
      { id: projectId },
      { headers }
    );
  }

  async setupEmail(
    options: SetupEmailServiceModel,
    credentials?: ApiCredentials
  ): Promise<SetupEmailResponse> {
    const { sendgridKey } = options;

    validateSendGridKey(sendgridKey);

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.emailControllerSetup(
      { setupEmailServiceModel: options },
      { headers }
    );
  }

  async sendEmail(
    options: {
      recipients?: Array<EmailRecipient>;
      cc?: Array<EmailRecipient>;
      bcc?: Array<EmailRecipient>;
      replyToList?: Array<EmailRecipient>;
      sender: EmailSenderSendEmailModel;
      subject: string;
      contents: Array<EmailContent>;
    },
    credentials?: ApiCredentials
  ): Promise<SendEmailResponse> {
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
    recipients?.forEach((recipient) => validateEmailRecipient(recipient));
    contents.forEach((content) => validateEmailContent(content));
    validateEmailSender(sender);

    try {
      const sendEmailModel: SendEmailModel = {
        sender,
        content: contents,
        recipients: recipients ?? [],
        replyToList: replyToList ?? [],
        cc: cc ?? [],
        bcc: bcc ?? [],
        subject: options.subject,
      };

      const headers: Record<string, string> = {};
      if (credentials?.userJwt) {
        headers['X-User-JWT'] = credentials.userJwt;
      }
      if (credentials?.projectId !== undefined) {
        headers['X-Project-Id'] = String(credentials.projectId);
      }

      return await this.internalApi.emailControllerSendEmail(
        { sendEmailModel },
        { headers }
      );
    } catch (e) {
      throw e;
    }
  }
  async registerSenderAddress(
    options: {
      email: string;
      name: string;
      replyTo: string | undefined;
      nickname: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    },
    credentials?: ApiCredentials
  ): Promise<RegisterEmailResponse> {
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
      const registerEmailModel: RegisterEmailModel = {
        email,
        name,
        replyTo,
        address,
        nickname,
        zip,
        city,
        state,
        country,
      };

      const headers: Record<string, string> = {};
      if (credentials?.userJwt) {
        headers['X-User-JWT'] = credentials.userJwt;
      }
      if (credentials?.projectId !== undefined) {
        headers['X-Project-Id'] = String(credentials.projectId);
      }

      return await this.internalApi.emailControllerRegisterSenderAddress(
        { registerEmailModel },
        { headers }
      );
    } catch (e) {
      throw e;
    }
  }
  async registerDomain(
    options: {
      domain: string;
      subdomain: string | undefined;
    },
    credentials?: ApiCredentials
  ): Promise<RegisterDomainResponse> {
    const { domain, subdomain } = options;

    validateString(domain, 'Domain cannot be null or empty string');

    try {
      const registerDomainModel: RegisterDomainModel = {
        domain,
        subdomain,
      };

      const headers: Record<string, string> = {};
      if (credentials?.userJwt) {
        headers['X-User-JWT'] = credentials.userJwt;
      }
      if (credentials?.projectId !== undefined) {
        headers['X-Project-Id'] = String(credentials.projectId);
      }

      return await this.internalApi.emailControllerRegisterEmailDomain(
        { registerDomainModel },
        { headers }
      );
    } catch (e) {
      throw e;
    }
  }
  async verifyDomain(
    options: {
      domain: string;
    },
    credentials?: ApiCredentials
  ): Promise<RegisterDomainResponse> {
    const { domain } = options;

    validateString(domain, 'Domain cannot be null or empty string');

    try {
      const verifyDomainModel: VerifyDomainModel = {
        domain,
      };

      const headers: Record<string, string> = {};
      if (credentials?.userJwt) {
        headers['X-User-JWT'] = credentials.userJwt;
      }
      if (credentials?.projectId !== undefined) {
        headers['X-Project-Id'] = String(credentials.projectId);
      }

      return await this.internalApi.emailControllerVerifySenderDomain(
        { verifyDomainModel },
        { headers }
      );
    } catch (e) {
      throw e;
    }
  }

  async getStatistics(
    options: {
      startDate: string;
      endDate?: string;
      limit?: number;
      offset?: number;
      aggregatedBy?: string;
    },
    credentials?: ApiCredentials
  ): Promise<any> {
    const { startDate, endDate, limit, offset, aggregatedBy } = options;

    validateString(startDate, 'startDate must be non-empty');

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.emailControllerGetStatistics(
      { startDate, limit, offset, aggregatedBy: aggregatedBy as any, endDate },
      { headers }
    );
  }
}
