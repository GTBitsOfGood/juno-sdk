type EmailAPI = {
  sendEmail: () => void;
  registerSenderAddress: () => void;
};

export const emailAPI: EmailAPI = {
  sendEmail: function (): void {
    throw new Error('Function not implemented.');
  },
  registerSenderAddress: function (): void {
    throw new Error('Function not implemented.');
  },
};
