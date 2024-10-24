import { EmailContent, EmailRecipient, EmailSender } from "../internal/api";
import JunoError from "./errors";

export const validateString = (str?: String, errorMessage = "Invalid string argument") => {
  if (!str || str.trim().length === 0) {
    throw new JunoError(errorMessage);
  }
}

export const validateEmailRecipient = (recipient: EmailRecipient) => {
  if (!recipient) {
    throw new JunoError('Recipient cannot be null');
  }

  validateString(recipient.email);
  validateString(recipient.name);
};

export const validateEmailSender = (sender: EmailSender) => {
  if (!sender) {
    throw new JunoError('Sender cannot be null');
  }

  validateString(sender.email);
  validateString(sender.name);
};

export const validateEmailContent = (content: EmailContent) => {
  if (!content) {
    throw new JunoError('Content cannot be null');
  }

  validateString(content.type);
  validateString(content.value);
};

export const validators = {
  validateEmailRecipient,
  validateEmailSender,
  validateEmailContent,
}
