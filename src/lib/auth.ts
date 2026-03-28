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
} from '../internal/index';
import {
  validatePaginationParam,
  validateProjectIdentifier,
  validateString,
  validateUserCredentials,
} from './validators';

export type UserCredentials = string | { email: string; password: string };

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
        { issueApiKeyRequest },
        async ({ init }) => ({
          headers: { ...(init.headers as Record<string, string>), ...headers },
        })
      );
      return response;
    } catch (e) {
      throw e;
    }
  }
  async revokeKey(options: { apiKey: string }): Promise<any> {
    let { apiKey } = options;

    validateString(apiKey, 'The authorization token must be nonempty');

    apiKey = apiKey.trim();
    try {
      return await this.internalApi.authControllerDeleteApiKey({
        authorization: apiKey,
      });
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
    email: string;
    password: string;
  }): Promise<NewAccountRequestsResponse> {
    const { email, password } = options;

    validateString(email, 'The email must be nonempty');
    validateString(password, 'The password must be nonempty');

    return await this.internalApi.authControllerGetAllAccountRequests({
      xUserEmail: email.trim(),
      xUserPassword: password.trim(),
    });
  }

  async getAllApiKeys(options: {
    offset: string;
    limit: string;
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

    const response = await this.internalApi.authControllerGetAllApiKeys(
      { offset, limit },
      async ({ init }) => ({
        headers: { ...(init.headers as Record<string, string>), ...headers },
      })
    );
    return response;
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

    try {
      await this.internalApi.authControllerDeleteApiKeyById(
        { id: keyId },
        async ({ init }) => ({
          headers: { ...(init.headers as Record<string, string>), ...headers },
        })
      );
      return { success: true };
    } catch (e) {
      throw e;
    }
  }

  async deleteAccountRequest(options: {
    id: string;
    email: string;
    password: string;
  }): Promise<NewAccountRequestResponse> {
    const { id, email, password } = options;

    validateString(id, 'The id must be nonempty');
    validateString(email, 'The email must be nonempty');
    validateString(password, 'The password must be nonempty');

    return await this.internalApi.authControllerDeleteAccountRequest({
      id: id.trim(),
      xUserEmail: email.trim(),
      xUserPassword: password.trim(),
    });
  }
}
