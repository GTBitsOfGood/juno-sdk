import {
  DefaultApi,
  IssueApiKeyResponse,
  IssueApiKeyRequest,
} from '../internal/api';

export class AuthAPI {
  private internalApi: DefaultApi;
  private apiKey?: string;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new DefaultApi(baseURL);
    this.apiKey = apiKey;
  }
  async createKey(
    email: string,
    password: string,
    environment: string,
    description: string = '',
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<IssueApiKeyResponse> {
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
        email,
        password,
        description,
        environment,
      };
      const result = await this.internalApi.authControllerCreateApiKey(
        issueApiKeyRequest,
        options
      );
      return result.body;
    } catch (e) {
      throw e;
    }
  }
  async revokeKey(
    authorization: string,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<any> {
    if (!authorization || authorization.trim().length === 0) {
      throw new Error('The authorization token must be nonempty');
    }
    authorization = authorization.trim();
    try {
      const result = await this.internalApi.authControllerDeleteApiKey(
        authorization,
        options
      );
      return result.body;
    } catch (e) {
      throw e;
    }
  }
  async createJWT(): Promise<IssueApiKeyResponse> {
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
