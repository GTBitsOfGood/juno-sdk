import { EmailAPI } from '../../src/lib/email';
import { JunoValidationError } from '../../src/lib/errors';

describe('sendEmail validation tests', () => {
  it('throws a validation error with a recipient', async () => {
    let emailApi = new EmailAPI();

    await expect(
      (async () => {
        await emailApi.sendEmail({
          recipients: [
            {
              email: 'somerecipientemail',
            },
          ],
          cc: [],
          bcc: [],
          sender: {
            email: 'someemail',
          },
          subject: 'subject',
          contents: [
            {
              type: 'html',
              value: 'some value',
            },
          ],
        });
      })(),
    ).rejects.toThrow(); // Error from lack of apiKey
  });

  it('does not throw an validation error with a recipient', async () => {
    let emailApi = new EmailAPI();

    await expect(
      (async () => {
        await emailApi.sendEmail({
          recipients: [
            {
              email: 'somerecipientemail',
            },
          ],
          cc: [],
          bcc: [],
          sender: {
            email: 'someemail',
          },
          subject: 'subject',
          contents: [
            {
              type: 'html',
              value: 'some value',
            },
          ],
        });
      })(),
    ).rejects.toThrow(); // Error from lack of apiKey
  });

  it('does not throw an validation error with a recipient', async () => {
    let emailApi = new EmailAPI();

    await expect(
      (async () => {
        await emailApi.sendEmail({
          recipients: [
            {
              email: 'somerecipientemail',
            },
          ],
          sender: {
            email: 'someemail',
          },
          subject: 'subject',
          contents: [
            {
              type: 'html',
              value: 'some value',
            },
          ],
        });
      })(),
    ).rejects.toThrow(); // Error from lack of apiKey
  });

  it('throws an validation error with no recipient, cc, or bcc', async () => {
    let emailApi = new EmailAPI();

    await expect(
      (async () => {
        await emailApi.sendEmail({
          sender: {
            email: 'someemail',
          },
          subject: 'subject',
          contents: [
            {
              type: 'html',
              value: 'some value',
            },
          ],
        });
      })(),
    ).rejects.toThrow(JunoValidationError);

    // also with empty array
    await expect(
      (async () => {
        await emailApi.sendEmail({
          sender: {
            email: 'someemail',
          },
          subject: 'subject',
          contents: [
            {
              type: 'html',
              value: 'some value',
            },
          ],
        });
      })(),
    ).rejects.toThrow(JunoValidationError);
  });

  it('throws an validation error with an empty content array', async () => {
    let emailApi = new EmailAPI();

    await expect(
      (async () => {
        await emailApi.sendEmail({
          recipients: [{ email: 'someemail' }],
          sender: {
            email: 'someemail',
          },
          subject: 'subject',
          contents: [],
        });
      })(),
    ).rejects.toThrow(JunoValidationError);
  });

  it('does not throw a validation error with only cc', async () => {
    let emailApi = new EmailAPI();

    await expect(
      (async () => {
        await emailApi.sendEmail({
          cc: [
            {
              email: 'somerecipientemail',
            },
          ],
          sender: {
            email: 'someemail',
          },
          subject: 'subject',
          contents: [
            {
              type: 'html',
              value: 'some value',
            },
          ],
        });
      })(),
    ).rejects.toThrow(); // Error from lack of apiKey
  });

  it('does not throw a validation error with only bcc', async () => {
    let emailApi = new EmailAPI();

    await expect(
      (async () => {
        await emailApi.sendEmail({
          bcc: [
            {
              email: 'somerecipientemail',
            },
          ],
          sender: {
            email: 'someemail',
          },
          subject: 'subject',
          contents: [
            {
              type: 'html',
              value: 'some value',
            },
          ],
        });
      })(),
    ).rejects.toThrow(); // Error from lack of apiKey
  });
});

describe('Registering sender test validation tests', () => {
  it('throws a validation error if name is null or blank', async () => {
    let emailApi = new EmailAPI();

    let name: unknown = null;

    await expect(
      (async () => {
        await emailApi.registerSenderAddress({
          email: 'email',
          name: name as string,
          replyTo: 'replyto',
          nickname: 'nickname',
          address: 'address',
          city: 'city',
          state: 'state',
          zip: '11111',
          country: 'country',
        });
      })(),
    ).rejects.toThrow(JunoValidationError);

    name = '      ';

    await expect(
      (async () => {
        await emailApi.registerSenderAddress({
          email: 'email',
          name: name as string,
          replyTo: 'replyto',
          nickname: 'nickname',
          address: 'address',
          city: 'city',
          state: 'state',
          zip: '11111',
          country: 'country',
        });
      })(),
    ).rejects.toThrow(JunoValidationError);
  });

  it('throws a validation error if email is null or blank', async () => {
    let emailApi = new EmailAPI();

    let email: unknown = null;

    await expect(
      (async () => {
        await emailApi.registerSenderAddress({
          email: email as string,
          name: 'name',
          replyTo: 'replyto',
          nickname: 'nickname',
          address: 'address',
          city: 'city',
          state: 'state',
          zip: '11111',
          country: 'country',
        });
      })(),
    ).rejects.toThrow(JunoValidationError);

    email = '      ';

    await expect(
      (async () => {
        await emailApi.registerSenderAddress({
          email: email as string,
          name: 'name',
          replyTo: 'replyto',
          nickname: 'nickname',
          address: 'address',
          city: 'city',
          state: 'state',
          zip: '11111',
          country: 'country',
        });
      })(),
    ).rejects.toThrow(JunoValidationError);
  });

  it('does not throw a validation error if email and name are valid', async () => {
    let emailApi = new EmailAPI();

    await expect(
      (async () => {
        await emailApi.registerSenderAddress({
          email: 'email',
          name: 'name',
          replyTo: 'replyto',
          nickname: 'nickname',
          address: 'address',
          city: 'city',
          state: 'state',
          zip: '11111',
          country: 'country',
        });
      })(),
    ).rejects.toThrow(); // Error from lack of apiKey
  });
});

describe('register domain validation tests', () => {
  it('throws a validation error if domain is null or blank', async () => {
    let emailApi = new EmailAPI();

    let domain: unknown = null;

    await expect(
      (async () => {
        await emailApi.registerDomain({
          domain: domain as string,
          subdomain: undefined,
        });
      })(),
    ).rejects.toThrow(JunoValidationError);

    domain = '      ';

    await expect(
      (async () => {
        await emailApi.registerDomain({
          domain: domain as string,
          subdomain: undefined,
        });
      })(),
    ).rejects.toThrow(JunoValidationError);
  });
});

describe('verify domain validation tests', () => {
  it('throws a validation error if domain is null or blank', async () => {
    let emailApi = new EmailAPI();

    let domain: unknown = null;

    await expect(
      (async () => {
        await emailApi.verifyDomain({
          domain: domain as string,
        });
      })(),
    ).rejects.toThrow(JunoValidationError);

    domain = '      ';

    await expect(
      (async () => {
        await emailApi.verifyDomain({
          domain: domain as string,
        });
      })(),
    ).rejects.toThrow(JunoValidationError);
  });
});

describe('getSenders tests', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('throws an error when baseURL is not configured', async () => {
    let emailApi = new EmailAPI();

    await expect(emailApi.getSenders()).rejects.toThrow(
      'Base URL is not configured for EmailAPI',
    );
  });

  it('throws an error when response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Unauthorized',
    });

    let emailApi = new EmailAPI('http://localhost:8888', undefined);

    await expect(
      emailApi.getSenders({ userJwt: 'test-jwt', projectId: 1 }),
    ).rejects.toThrow('Failed to get senders: Unauthorized');
  });

  it('returns senders on success', async () => {
    const mockSenders = {
      senders: [
        {
          id: 1,
          nickname: 'Test Sender',
          fromEmail: 'test@example.com',
          fromName: 'Test',
          replyTo: 'test@example.com',
          address: '123 Main St',
          city: 'Atlanta',
          state: 'GA',
          country: 'USA',
          zip: '30332',
          verified: true,
          locked: false,
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSenders,
    });

    let emailApi = new EmailAPI('http://localhost:8888', undefined);
    const result = await emailApi.getSenders({
      userJwt: 'test-jwt',
      projectId: 1,
    });

    expect(result).toEqual(mockSenders);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8888/email/senders',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'X-User-JWT': 'test-jwt',
          'X-Project-Id': '1',
        }),
      }),
    );
  });
});

describe('getDomains tests', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('throws an error when baseURL is not configured', async () => {
    let emailApi = new EmailAPI();

    await expect(emailApi.getDomains()).rejects.toThrow(
      'Base URL is not configured for EmailAPI',
    );
  });

  it('throws an error when response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Forbidden',
    });

    let emailApi = new EmailAPI('http://localhost:8888', undefined);

    await expect(
      emailApi.getDomains({ userJwt: 'test-jwt', projectId: 1 }),
    ).rejects.toThrow('Failed to get domains: Forbidden');
  });

  it('returns domains on success', async () => {
    const mockDomains = {
      domains: [
        {
          id: 1,
          domain: 'example.com',
          subdomain: 'mail',
          valid: true,
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockDomains,
    });

    let emailApi = new EmailAPI('http://localhost:8888', undefined);
    const result = await emailApi.getDomains({
      userJwt: 'test-jwt',
      projectId: 1,
    });

    expect(result).toEqual(mockDomains);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8888/email/domains',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'X-User-JWT': 'test-jwt',
          'X-Project-Id': '1',
        }),
      }),
    );
  });
});
