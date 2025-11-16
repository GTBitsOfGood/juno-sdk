import {
  EmailApi,
  EmailConfigResponse,
  FileConfigApi,
  FileConfigResponse,
} from '../internal/api';
import { ApiCredentials } from './apiCredentials';

export class SettingsAPI {
  private internalFileConfigApi: FileConfigApi;
  private internalEmailApi: EmailApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalFileConfigApi = new FileConfigApi(baseURL);
    this.internalFileConfigApi.accessToken = apiKey;

    this.internalEmailApi = new EmailApi(baseURL);
    this.internalEmailApi.accessToken = apiKey;
  }

  async getFileConfig(
    projectId: string,
    credentials?: ApiCredentials
  ): Promise<FileConfigResponse> {
    const headers: any = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    const res =
      await this.internalFileConfigApi.fileConfigControllerGetFileConfigByProjectId(
        projectId,
        { headers }
      );
    return res.body;
  }

  async getEmailConfig(
    projectId: string,
    credentials?: ApiCredentials
  ): Promise<EmailConfigResponse> {
    const headers: any = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    const res = await this.internalEmailApi.emailControllerGetEmailConfigById(
      projectId,
      { headers }
    );
    return res.body;
  }
}
