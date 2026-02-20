import {
  AuthApi,
  Configuration,
  IssueApiKeyResponse,
  IssueApiKeyRequest,
  IssueJWTResponse,
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
}
