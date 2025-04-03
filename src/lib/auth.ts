import {
  AuthApi,
  IssueApiKeyResponse,
  IssueApiKeyRequest,
  IssueJWTResponse,
} from '../internal/api';
import { validateString } from './validators';

export type UserCredentials = string | { email: string; password: string; }

export class AuthAPI {
  private internalApi: AuthApi;
  private apiKey?: string;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new AuthApi(baseURL);
    this.apiKey = apiKey;
    this.internalApi.accessToken = this.apiKey;
  }
  get junoApiKey(): string {
    return this.apiKey;
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
      const result = await this.internalApi.authControllerCreateApiKey(
        email,
        password,
        issueApiKeyRequest
      );
      return result.body;
    } catch (e) {
      throw e;
    }
  }
  async revokeKey(options: { apiKey: string }): Promise<any> {
    let { apiKey } = options;

    validateString(apiKey, 'The authorization token must be nonempty');

    apiKey = apiKey.trim();
    try {
      const result = await this.internalApi.authControllerDeleteApiKey(apiKey);
      return result.body;
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
      const result = await this.internalApi.authControllerGetUserJWT(
        password,
        email
      );

      return result.body;
    } catch (e) {
      throw e;
    }
  }

  async getApiKeyJWT(options: { apiKey: string }): Promise<IssueJWTResponse> {
    const { apiKey } = options;
    try {
      const result = await this.internalApi.authControllerGetApiKeyJWT(apiKey);

      return result.body;
    } catch (e) {
      throw e;
    }
  }
}
