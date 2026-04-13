import {
  AuthApi,
  Configuration,
  IssueApiKeyResponse,
  IssueApiKeyRequest,
  IssueJWTResponse,
  NewAccountRequestResponse,
  NewAccountRequestsResponse,
  RequestNewAccountModel,
  RequestNewAccountModelUserTypeEnum,
  GetAllApiKeysResponse,
  AcceptAccountRequestResponseModel,
} from '../internal/index';
import {
  validatePaginationParam,
  validateProjectIdentifier,
  validateString,
  validateUserCredentials,
} from './validators';

export type UserCredentials = string | { email: string; password: string };

export type UserType = 'SUPERADMIN' | 'ADMIN' | 'USER';

export class AuthAPI {
  private internalApi: AuthApi;
  private apiKey?: string;
  constructor(baseURL?: string, apiKey?: string) {
    this.apiKey = apiKey;
    this.internalApi = new AuthApi(
      new Configuration({ basePath: baseURL, accessToken: apiKey })
    );
  }
  get junoApiKey(): string {
    return this.apiKey || '';
  }
  async createKey(options: {
    project: string;
    environment: string;
    description: string | undefined;
    credentials: UserCredentials;
  }): Promise<IssueApiKeyResponse> {
    let { project, environment, description, credentials } = options;

    validateUserCredentials(credentials);
    validateProjectIdentifier({ name: project });

    validateString(
      environment,
      'The environment for the API key must be nonempty'
    );

    environment = environment.trim();
    description = description?.trim();
    try {
      const issueApiKeyRequest: IssueApiKeyRequest = {
        description,
        environment,
        project: {
          name: project,
        },
      };

      const headers: Record<string, string> = {};
      if (typeof credentials === 'string') {
        headers['Authorization'] = `Bearer ${credentials}`;
      } else {
        headers['X-User-Email'] = credentials.email;
        headers['X-User-Password'] = credentials.password;
      }

      const response = await this.internalApi.authControllerCreateApiKey(
        {
          issueApiKeyRequest,
          ...(typeof credentials === 'string'
            ? { xUserJwt: credentials }
            : {
                xUserEmail: credentials.email,
                xUserPassword: credentials.password,
              }),
        },
        async ({ init }) => ({
          headers: { ...(init.headers as Record<string, string>), ...headers },
        })
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  async getUserJWT(options: {
    email: string;
    password: string;
  }): Promise<IssueJWTResponse> {
    const { email, password } = options;
    try {
      return await this.internalApi.authControllerGetUserJWT({
        xUserPassword: password,
        xUserEmail: email,
      });
    } catch (e) {
      throw e;
    }
  }

  async getApiKeyJWT(options: { apiKey: string }): Promise<IssueJWTResponse> {
    const { apiKey } = options;
    try {
      return await this.internalApi.authControllerGetApiKeyJWT({
        authorization: apiKey,
      });
    } catch (e) {
      throw e;
    }
  }

  async requestNewAccount(options: {
    email: string;
    name: string;
    password: string;
    userType: RequestNewAccountModelUserTypeEnum;
    projectName?: string;
  }): Promise<NewAccountRequestResponse> {
    const { email, name, password, userType, projectName } = options;

    validateString(email, 'The email must be nonempty');
    validateString(name, 'The name must be nonempty');
    validateString(password, 'The password must be nonempty');
    validateString(userType, 'The userType must be nonempty');

    const requestNewAccountModel: RequestNewAccountModel = {
      email: email.trim(),
      name: name.trim(),
      password: password.trim(),
      userType,
      projectName: projectName?.trim(),
    };

    return await this.internalApi.authControllerCreateAccountRequest({
      requestNewAccountModel,
    });
  }

  async getAllAccountRequests(options: {
    credentials: UserCredentials;
  }): Promise<NewAccountRequestsResponse> {
    const { credentials } = options;

    validateUserCredentials(credentials);

    if (typeof credentials == 'string') {
      return await this.internalApi.authControllerGetAllAccountRequests(
        { xUserEmail: '', xUserPassword: '' },
        async ({ init }) => ({
          headers: {
            ...(init.headers as Record<string, string>),
            Authorization: `Bearer ${credentials}`,
          },
        })
      );
    } else {
      return await this.internalApi.authControllerGetAllAccountRequests({
        xUserEmail: credentials.email,
        xUserPassword: credentials.password,
      });
    }
  }

  async acceptAccountRequest(options: {
    id: string;
    credentials: UserCredentials;
  }): Promise<AcceptAccountRequestResponseModel> {
    let { id, credentials } = options;

    validateString(id, 'The request ID must be nonempty');
    validateUserCredentials(credentials);

    id = id.trim();

    try {
      if (typeof credentials == 'string') {
        return await this.internalApi.authControllerAcceptAccountRequest(
          { id },
          async ({ init }) => ({
            headers: {
              ...(init.headers as Record<string, string>),
              Authorization: `Bearer ${credentials}`,
            },
          })
        );
      } else {
        return await this.internalApi.authControllerAcceptAccountRequest({
          id,
          xUserPassword: credentials.password,
          xUserEmail: credentials.email,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  async getAllApiKeys(options: {
    offset: number;
    limit: number;
    credentials: UserCredentials;
  }): Promise<GetAllApiKeysResponse> {
    const { offset, limit, credentials } = options;
    validateUserCredentials(credentials);
    validatePaginationParam(offset, 'offset must be a non-negative number');
    validatePaginationParam(limit, 'limit must be a non-negative number');
    const headers: Record<string, string> = {};
    if (typeof credentials === 'string') {
      headers['Authorization'] = `Bearer ${credentials}`;
    } else {
      headers['X-User-Email'] = credentials.email;
      headers['X-User-Password'] = credentials.password;
    }

    return this.internalApi.authControllerGetAllApiKeys(
      {
        offset,
        limit,
        ...(typeof credentials === 'string'
          ? { xUserJwt: credentials }
          : {
              xUserEmail: credentials.email,
              xUserPassword: credentials.password,
            }),
      },
      async ({ init }) => ({
        headers: { ...(init.headers as Record<string, string>), ...headers },
      })
    );
  }

  async deleteApiKeyById(options: {
    keyId: string;
    credentials: UserCredentials;
  }): Promise<{ success: boolean }> {
    const { keyId, credentials } = options;
    validateUserCredentials(credentials);
    validateString(keyId, 'The key ID must be nonempty');

    const headers: Record<string, string> = {};
    if (typeof credentials === 'string') {
      headers['Authorization'] = `Bearer ${credentials}`;
    } else {
      headers['X-User-Email'] = credentials.email;
      headers['X-User-Password'] = credentials.password;
    }

    await this.internalApi.authControllerDeleteApiKeyById(
      {
        id: keyId,
        ...(typeof credentials === 'string'
          ? { xUserJwt: credentials }
          : {
              xUserEmail: credentials.email,
              xUserPassword: credentials.password,
            }),
      },
      async ({ init }) => ({
        headers: { ...(init.headers as Record<string, string>), ...headers },
      })
    );
    return { success: true };
  }

  async deleteAccountRequest(options: {
    id: string;
    credentials: UserCredentials;
  }): Promise<NewAccountRequestResponse> {
    const { id, credentials } = options;

    validateString(id, 'The id must be nonempty');
    validateUserCredentials(credentials);

    if (typeof credentials == 'string') {
      return await this.internalApi.authControllerDeleteAccountRequest(
        { id: id.trim(), xUserEmail: '', xUserPassword: '' },
        async ({ init }) => ({
          headers: {
            ...(init.headers as Record<string, string>),
            Authorization: `Bearer ${credentials}`,
          },
        })
      );
    } else {
      return await this.internalApi.authControllerDeleteAccountRequest({
        id: id.trim(),
        xUserEmail: credentials.email,
        xUserPassword: credentials.password,
      });
    }
  }
}
