import { EmailContent, EmailRecipient, EmailSender } from '../internal/api';
import { JunoValidationError } from './errors';
import { ProjectIdentifier, UserIdentifier } from './identifiers';

export const validateString = (
  str?: String,
  errorMessage = 'Invalid string argument'
) => {
  if (typeof str !== 'string' || !str || str.trim().length === 0) {
    throw new JunoValidationError(errorMessage);
  }
};

export const validateEmailRecipient = (recipient: EmailRecipient) => {
  if (!recipient) {
    throw new JunoValidationError('Recipient cannot be null');
  }

  validateString(recipient.email, 'Recipient email cannot be null or empty');
};

export const validateEmailSender = (sender: EmailSender) => {
  if (!sender) {
    throw new JunoValidationError('Sender cannot be null');
  }

  validateString(sender.email, 'Sender email cannot be null or empty');
};

export const validateEmailContent = (content: EmailContent) => {
  if (!content) {
    throw new JunoValidationError('Content cannot be null');
  }

  validateString(content.type, 'Content type cannot be null or empty');
  validateString(content.value, 'Content value cannot be null or empty');
};


export const validateProjectIdentifier = (input: ProjectIdentifier) => {
  if (!input) {
    throw new JunoValidationError(
      'The user input provided must include either the id or name and cannot be null.'
    );
  }

  const hasName = 'name' in input;
  const hasId = 'id' in input;

  if (!hasName && !hasId) {
    throw new JunoValidationError('The user input provided must include either the id or name and cannot be null.');
  }

  if (hasName && hasId) {
    throw new JunoValidationError('The user input provided must include either the id or name, but not both.');
  }

  if (hasName) {
    if (typeof input.name === "string") {
      validateString(input.name);
    } else {
      throw new JunoValidationError("The user name must be of type string")
    }
  }

  if (hasId) {

    if (typeof input.id === "number") {
      if (input.id < 0) throw new JunoValidationError('User IDs cannot be negative')
    } else {
      throw new JunoValidationError("The user input ID must be of type number")
    }
  }
};



export const validateUserIdentifier = (input: UserIdentifier) => {
  if (!input) {
    throw new JunoValidationError(
      'The user input provided must include either the id or email and cannot be null.'
    );
  }

  const hasEmail = 'email' in input;
  const hasId = 'id' in input;

  if (!hasEmail && !hasId) {
    throw new JunoValidationError('The user input provided must include either the id or email and cannot be null.');
  }

  if (hasEmail && hasId) {
    throw new JunoValidationError('The user input provided must include either the id or email, but not both.');
  }

  if (hasEmail) {
    if (typeof input.email === "string") {
      validateString(input.email);
    } else {
      throw new JunoValidationError("The user email must be of type string")
    }
  }

  if (hasId) {

    if (typeof input.id === "number") {
      if (input.id < 0) throw new JunoValidationError('User IDs cannot be negative')
    } else {
      throw new JunoValidationError("The user input ID must be of type number")
    }
  }
};


