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
  AcceptAccountRequestResponseModel,
} from '../internal/index';
import { validateString, validateUserCredentials } from './validators';

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
    email: string;
    password: string;
    project: string;
    environment: string;
    description: string | undefined;
  }): Promise<IssueApiKeyResponse> {
    let { email, password, project, environment, description } = options;

    validateString(email, 'The email must be nonempty');

    validateString(password, 'The password for the user must be nonempty');
    validateString(
      environment,
      'The environment for the user must be nonempty'
    );

    email = email.trim();
    password = password.trim();
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
      return await this.internalApi.authControllerCreateApiKey({
        xUserPassword: password,
        xUserEmail: email,
        issueApiKeyRequest,
      });
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
