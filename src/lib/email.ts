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
} from '../internal/api';

export type EmailAPI = {
  sendEmail: (
    recipients: Array<EmailRecipient>,
    sender: EmailSender,
    content: Array<EmailContent>
  ) => Promise<SendEmailResponse>;
  registerSenderAddress: (email: string) => Promise<RegisterEmailResponse>;
  registerDomain: (domain: string, subdomain: string) => Promise<RegisterEmailResponse>;
  verifyDomain: (domain: string) => Promise<RegisterEmailResponse>;
};

const emailApiInternal = new EmailApi();

export const emailAPI: EmailAPI = {
  sendEmail: async function (
    recipients: Array<EmailRecipient>,
    sender: EmailSender,
    contents: Array<EmailContent>
  ): Promise<SendEmailResponse> {
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

      const result = await emailApiInternal.emailControllerSendEmail(
        sendEmailModel
      );
      return result.body;
    } catch (e) {
      throw new Error(e);
    }
  },
  registerSenderAddress: async function (
    email: string
  ): Promise<RegisterEmailResponse> {
    if (!email || email.trim().length === 0) {
      throw new Error('Email cannot be null or empty string');
    }
    try {
      const registerEmailModel = new RegisterEmailModel();
      registerEmailModel.email = email;

      const result =
        await emailApiInternal.emailControllerRegisterSenderAddress(
          registerEmailModel
        );
      return result.body;
    } catch (e) {
      throw new Error(e);
    }
  },
  registerDomain: async function (
    domain: string,
    subdomain: string
  ): Promise<RegisterEmailResponse> {
    if (!domain || domain.trim().length === 0) {
      throw new Error('Domain cannot be null or empty string');
    }

    if (!subdomain || subdomain.trim().length === 0) {
      throw new Error('Subdomain cannot be null or empty string');
    }
    
    try {
      const registerDomainModel = new RegisterDomainModel();
      registerDomainModel.domain = domain;
      registerDomainModel.subdomain = subdomain;

      const result =
        await emailApiInternal.emailControllerRegisterEmailDomain(
          registerDomainModel
        );
      return result.body;
    } catch (e) {
      throw new Error(e);
    }
  },
  verifyDomain: async function (
    domain: string
  ): Promise<RegisterEmailResponse> {
    if (!domain || domain.trim().length === 0) {
      throw new Error('Domain cannot be null or empty string');
    }
    
    try {
      const verifyDomainModel = new VerifyDomainModel();
      verifyDomainModel.domain = domain;

      const result =
        await emailApiInternal.emailControllerVerifySenderDomain(
          verifyDomainModel
        );
      return result.body;
    } catch (e) {
      throw new Error(e);
    }
  }
};

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
