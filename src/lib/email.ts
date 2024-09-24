import {
  RegisterEmailModel,
  SendEmailModel,
  EmailRecipient,
  EmailSender,
  EmailContent,
  SendEmailResponse,
  RegisterEmailResponse,
  EmailApi,
} from '../internal/api';
import http from 'http';

type EmailAPI = {
  sendEmail: (
    recipients: Array<EmailRecipient>,
    sender: EmailSender,
    content: Array<EmailContent>
  ) => Promise<{ response: http.IncomingMessage; body: SendEmailResponse }>;
  registerSenderAddress: (
    email: string
  ) => Promise<{ response: http.IncomingMessage; body: RegisterEmailResponse }>;
};

const emailApiInternal = new EmailApi();

export const emailAPI: EmailAPI = {
  sendEmail: async function (
    recipients: Array<EmailRecipient>,
    sender: EmailSender,
    contents: Array<EmailContent>
  ): Promise<{ response: http.IncomingMessage; body: SendEmailResponse }> {
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
      return result;
    } catch (e) {
      throw new Error(e);
    }
  },
  registerSenderAddress: async function (
    email: string
  ): Promise<{ response: http.IncomingMessage; body: RegisterEmailResponse }> {
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
      return result;
    } catch (e) {
      throw new Error(e);
    }
  },
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
