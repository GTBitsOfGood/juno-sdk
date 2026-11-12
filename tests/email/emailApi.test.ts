import { EmailAPI } from '../../src/lib/email';
import { AuthAPI } from '../../src/lib/auth';
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
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
      })()
    ).rejects.toThrow(JunoValidationError);

    domain = '      ';

    await expect(
      (async () => {
        await emailApi.registerDomain({
          domain: domain as string,
          subdomain: undefined,
        });
      })()
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
      })()
    ).rejects.toThrow(JunoValidationError);

    domain = '      ';

    await expect(
      (async () => {
        await emailApi.verifyDomain({
          domain: domain as string,
        });
      })()
    ).rejects.toThrow(JunoValidationError);
  });
});

// The generated client calls the global fetch, so these tests replace it with a
// stub that returns a canned response and records the request.
function mockFetch(status: number, body: unknown) {
  const fetchMock = jest.fn().mockResolvedValue({
    status,
    json: async () => body,
    clone() {
      return this;
    },
  });
  (global as any).fetch = fetchMock;
  return fetchMock;
}

const authWithKey = { junoApiKey: 'test-api-key' } as unknown as AuthAPI;

describe('getSenders tests', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns the senders from the gateway', async () => {
    mockFetch(200, {
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
    });

    const emailApi = new EmailAPI('http://localhost:8888', authWithKey);
    const result = await emailApi.getSenders({
      userJwt: 'test-jwt',
      projectId: 1,
    });

    expect(result.senders).toHaveLength(1);
    expect(result.senders[0]).toMatchObject({
      id: 1,
      fromEmail: 'test@example.com',
      verified: true,
      locked: false,
    });
  });

  it('sends the API key, user JWT and project id', async () => {
    const fetchMock = mockFetch(200, { senders: [] });

    const emailApi = new EmailAPI('http://localhost:8888', authWithKey);
    await emailApi.getSenders({ userJwt: 'test-jwt', projectId: 1 });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('http://localhost:8888/email/senders');
    expect(init.method).toBe('GET');
    expect(init.headers).toMatchObject({
      Authorization: 'Bearer test-api-key',
      'X-User-JWT': 'test-jwt',
      'X-Project-Id': '1',
    });
  });

  it('sends project id 0', async () => {
    const fetchMock = mockFetch(200, { senders: [] });

    const emailApi = new EmailAPI('http://localhost:8888', authWithKey);
    await emailApi.getSenders({ projectId: 0 });

    const init = fetchMock.mock.calls[0][1];
    expect(init.headers).toMatchObject({ 'X-Project-Id': '0' });
    expect(init.headers).not.toHaveProperty('X-User-JWT');
  });

  it('sends no project headers without credentials', async () => {
    const fetchMock = mockFetch(200, { senders: [] });

    const emailApi = new EmailAPI('http://localhost:8888', authWithKey);
    await emailApi.getSenders();

    const init = fetchMock.mock.calls[0][1];
    expect(init.headers).not.toHaveProperty('X-User-JWT');
    expect(init.headers).not.toHaveProperty('X-Project-Id');
  });

  it('throws when the gateway rejects the request', async () => {
    mockFetch(401, { message: 'Unauthorized' });

    const emailApi = new EmailAPI('http://localhost:8888', authWithKey);

    await expect(
      emailApi.getSenders({ userJwt: 'bad-jwt', projectId: 1 })
    ).rejects.toMatchObject({
      name: 'ResponseError',
      response: { status: 401 },
    });
  });
});

describe('getDomains tests', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns the domains from the gateway with boolean valid flags', async () => {
    mockFetch(200, {
      domains: [
        { id: 1, domain: 'example.com', subdomain: 'mail', valid: true },
        { id: 2, domain: 'pending.com', valid: false },
      ],
    });

    const emailApi = new EmailAPI('http://localhost:8888', authWithKey);
    const result = await emailApi.getDomains({
      userJwt: 'test-jwt',
      projectId: 1,
    });

    expect(result.domains).toHaveLength(2);
    expect(result.domains[0]).toMatchObject({
      id: 1,
      domain: 'example.com',
      subdomain: 'mail',
      valid: true,
    });
    expect(result.domains[1].valid).toBe(false);
    expect(result.domains[1].subdomain).toBeUndefined();
  });

  it('sends the API key, user JWT and project id', async () => {
    const fetchMock = mockFetch(200, { domains: [] });

    const emailApi = new EmailAPI('http://localhost:8888', authWithKey);
    await emailApi.getDomains({ userJwt: 'test-jwt', projectId: 1 });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('http://localhost:8888/email/domains');
    expect(init.method).toBe('GET');
    expect(init.headers).toMatchObject({
      Authorization: 'Bearer test-api-key',
      'X-User-JWT': 'test-jwt',
      'X-Project-Id': '1',
    });
  });

  it('sends no project headers without credentials', async () => {
    const fetchMock = mockFetch(200, { domains: [] });

    const emailApi = new EmailAPI('http://localhost:8888', authWithKey);
    await emailApi.getDomains();

    const init = fetchMock.mock.calls[0][1];
    expect(init.headers).not.toHaveProperty('X-User-JWT');
    expect(init.headers).not.toHaveProperty('X-Project-Id');
  });

  it('throws when the gateway rejects the request', async () => {
    mockFetch(403, { message: 'Forbidden' });

    const emailApi = new EmailAPI('http://localhost:8888', authWithKey);

    await expect(
      emailApi.getDomains({ userJwt: 'test-jwt', projectId: 1 })
    ).rejects.toMatchObject({
      name: 'ResponseError',
      response: { status: 403 },
    });
  });
});
