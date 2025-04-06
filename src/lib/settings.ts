import {
  EmailApi,
  EmailConfigResponse,
  FileConfigApi,
  FileConfigResponse,
} from '../internal/api';

export class SettingsAPI {
  private internalFileConfigApi: FileConfigApi;
  private internalEmailApi: EmailApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalFileConfigApi = new FileConfigApi(baseURL);
    this.internalFileConfigApi.accessToken = apiKey;

    this.internalEmailApi = new EmailApi(baseURL);
    this.internalEmailApi.accessToken = apiKey;
  }

  async getFileConfig(projectId: string): Promise<FileConfigResponse> {
    const res =
      await this.internalFileConfigApi.fileConfigControllerGetFileConfigByProjectId(
        projectId
      );
    return res.body;
  }

  async getEmailConfig(projectId: string): Promise<EmailConfigResponse> {
    const res = await this.internalEmailApi.emailControllerGetEmailConfigById(
      projectId
    );
    return res.body;
  }
}
