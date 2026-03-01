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
} from '../internal/index';
import { validateString } from './validators';

export type UserCredentials = string | { email: string; password: string };

export class AuthAPI {
  private internalApi: AuthApi;
  private apiKey?: string;
  constructor(baseURL?: string, apiKey?: string) {
    this.apiKey = apiKey;
    this.internalApi = new AuthApi(new Configuration({ basePath: baseURL, accessToken: apiKey }));
  }
  get junoApiKey(): string {
    return this.apiKey || "";
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
      return await this.internalApi.authControllerDeleteApiKey({ authorization: apiKey });
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
      return await this.internalApi.authControllerGetApiKeyJWT({ authorization: apiKey });
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
      projectName,
    };

    return await this.internalApi.authControllerCreateAccountRequest({ requestNewAccountModel });
  }

  async getAllAccountRequests(options: {
    email: string;
    password: string;
  }): Promise<NewAccountRequestsResponse> {
    const { email, password } = options;

    validateString(email, 'The email must be nonempty');
    validateString(password, 'The password must be nonempty');

    return await this.internalApi.authControllerGetAllAccountRequests({
      xUserEmail: email,
      xUserPassword: password,
    });
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
      id,
      xUserEmail: email,
      xUserPassword: password,
    });
  }
}
