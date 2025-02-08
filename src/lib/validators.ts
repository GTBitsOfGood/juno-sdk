import { EmailContent, EmailRecipient, EmailSender } from "../internal/api";
import { JunoValidationError } from "./errors";

export const validateString = (str?: String, errorMessage = "Invalid string argument") => {
  if (typeof str !== 'string' || !str || str.trim().length === 0) {
    throw new JunoValidationError(errorMessage);
  }
}

export const validateEmailRecipient = (recipient: EmailRecipient) => {
  if (!recipient) {
    throw new JunoValidationError('Recipient cannot be null');
  }

  validateString(recipient.email, "Recipient email cannot be null or empty");
};

export const validateEmailSender = (sender: EmailSender) => {
  if (!sender) {
    throw new JunoValidationError('Sender cannot be null');
  }

  validateString(sender.email, "Sender email cannot be null or empty");
};

export const validateEmailContent = (content: EmailContent) => {
  if (!content) {
    throw new JunoValidationError('Content cannot be null');
  }

  validateString(content.type, "Content type cannot be null or empty");
  validateString(content.value, "Content value cannot be null or empty");
};

export const validators = {
  validateEmailRecipient,
  validateEmailSender,
  validateEmailContent,
}
