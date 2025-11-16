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
  EmailSenderSendEmailModel,
} from '../internal/api';
import { AuthAPI } from './auth';
import { ApiCredentials } from './apiCredentials';
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
    this.internalApi = new EmailApi(baseURL);
    this.auth = auth;
    this.internalApi.accessToken = this.auth?.junoApiKey;
  }

  async setupEmail(
    options: SetupEmailServiceModel,
    credentials?: ApiCredentials
  ): Promise<SetupEmailResponse> {
    const { sendgridKey } = options;

    validateSendGridKey(sendgridKey);

    const headers: any = {
      Authorization: `Bearer ${this.auth.junoApiKey}`,
    };
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    const result = await this.internalApi.emailControllerSetup(options, {
      headers,
    });

    return result.body;
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

      const headers: any = {
        Authorization: `Bearer ${this.auth.junoApiKey}`,
      };
      if (credentials?.userJwt) {
        headers['X-User-JWT'] = credentials.userJwt;
      }
      if (credentials?.projectId !== undefined) {
        headers['X-Project-Id'] = String(credentials.projectId);
      }

      const result = await this.internalApi.emailControllerSendEmail(
        sendEmailModel,
        {
          headers,
        }
      );
      return result.body;
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

      const headers: any = {
        Authorization: `Bearer ${this.auth.junoApiKey}`,
      };
      if (credentials?.userJwt) {
        headers['X-User-JWT'] = credentials.userJwt;
      }
      if (credentials?.projectId !== undefined) {
        headers['X-Project-Id'] = String(credentials.projectId);
      }

      const result =
        await this.internalApi.emailControllerRegisterSenderAddress(
          registerEmailModel,
          {
            headers,
          }
        );
      return result.body;
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
      const registerDomainModel = new RegisterDomainModel();
      registerDomainModel.domain = domain;
      registerDomainModel.subdomain = subdomain;

      const headers: any = {
        Authorization: `Bearer ${this.auth.junoApiKey}`,
      };
      if (credentials?.userJwt) {
        headers['X-User-JWT'] = credentials.userJwt;
      }
      if (credentials?.projectId !== undefined) {
        headers['X-Project-Id'] = String(credentials.projectId);
      }

      const result = await this.internalApi.emailControllerRegisterEmailDomain(
        registerDomainModel,
        {
          headers,
        }
      );
      return result.body;
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
      const verifyDomainModel = new VerifyDomainModel();
      verifyDomainModel.domain = domain;

      const headers: any = {
        Authorization: `Bearer ${this.auth.junoApiKey}`,
      };
      if (credentials?.userJwt) {
        headers['X-User-JWT'] = credentials.userJwt;
      }
      if (credentials?.projectId !== undefined) {
        headers['X-Project-Id'] = String(credentials.projectId);
      }

      const result = await this.internalApi.emailControllerVerifySenderDomain(
        verifyDomainModel,
        {
          headers,
        }
      );
      return result.body;
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

    const headers: any = {
      Authorization: `Bearer ${this.auth.junoApiKey}`,
    };
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    const queryParams: any = { startDate };
    if (endDate) queryParams.endDate = endDate;
    if (limit !== undefined) queryParams.limit = limit;
    if (offset !== undefined) queryParams.offset = offset;
    if (aggregatedBy) queryParams.aggregatedBy = aggregatedBy;

    const result = await this.internalApi.emailControllerGetStatistics(
      startDate,
      limit,
      offset,
      aggregatedBy as any,
      endDate,
      { headers }
    );
    return result.body;
  }
}
