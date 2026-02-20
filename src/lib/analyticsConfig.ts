import {
  AnalyticsConfigApi,
  Configuration,
  AnalyticsConfigResponse,
  CreateAnalyticsConfigModel,
  UpdateAnalyticsConfigModel,
} from '../internal/index';
import { ApiCredentials } from './apiCredentials';
import { validateString } from './validators';

export class AnalyticsConfigAPI {
  private internalApi: AnalyticsConfigApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new AnalyticsConfigApi(new Configuration({ basePath: baseURL, accessToken: apiKey }));
  }

  async createAnalyticsConfig(
    config: CreateAnalyticsConfigModel,
    credentials?: ApiCredentials
  ): Promise<AnalyticsConfigResponse> {
    validateString(
      config.clientAnalyticsKey,
      'The clientAnalyticsKey must be provided as an input and has to be nonempty.'
    );

    validateString(
      config.serverAnalyticsKey,
      'The serverAnalyticsKey must be provided as an input and has to be nonempty.'
    );

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined && credentials.projectId !== null) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.analyticsConfigControllerCreateAnalyticsConfig(
      { createAnalyticsConfigModel: config },
      { headers }
    );
  }

  async getAnalyticsConfig(
    projectId: string,
    credentials?: ApiCredentials
  ): Promise<AnalyticsConfigResponse> {
    validateString(
      projectId,
      'The projectId must be provided as an input and has to be nonempty.'
    );

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.analyticsConfigControllerGetAnalyticsConfig(
      { projectId },
      { headers }
    );
  }

  async updateAnalyticsConfig(
    projectId: string,
    config: UpdateAnalyticsConfigModel
  ): Promise<AnalyticsConfigResponse> {
    validateString(
      projectId,
      'The projectId must be provided as an input and has to be nonempty.'
    );

    return await this.internalApi.analyticsConfigControllerUpdateAnalyticsConfig({
      projectId,
      updateAnalyticsConfigModel: config,
    });
  }

  async deleteAnalyticsConfig(
    projectId: string
  ): Promise<AnalyticsConfigResponse> {
    validateString(
      projectId,
      'The projectId must be provided as an input and has to be nonempty.'
    );

    return await this.internalApi.analyticsConfigControllerDeleteAnalyticsConfig({ projectId });
  }
}
