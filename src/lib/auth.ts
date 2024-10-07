import {
  AuthApi,
  IssueApiKeyResponse,
  IssueApiKeyRequest,
  IssueJWTResponse,
} from '../internal/api';

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
    if (!email || email.trim().length === 0) {
      throw new Error('The email must be nonempty');
    }
    if (!password || password.trim().length === 0) {
      throw new Error('The password for the user must be nonempty');
    }
    if (!environment || environment.trim().length === 0) {
      throw new Error('The environment for the user must be nonempty');
    }
    email = email.trim();
    password = password.trim();
    environment = environment.trim();
    description = description.trim();
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
    if (!apiKey || apiKey.trim().length === 0) {
      throw new Error('The authorization token must be nonempty');
    }
    apiKey = apiKey.trim();
    try {
      const result = await this.internalApi.authControllerDeleteApiKey(apiKey);
      return result.body;
    } catch (e) {
      throw e;
    }
  }
  async createJWT(): Promise<IssueJWTResponse> {
    try {
      const result = await this.internalApi.authControllerGetJWT(
        'Bearer ' + this.apiKey
      );
      return result.body;
    } catch (e) {
      throw e;
    }
  }
}
