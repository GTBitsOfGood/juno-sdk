import {
  AnalyticsConfigApi,
  AnalyticsConfigResponse,
  CreateAnalyticsConfigModel,
  UpdateAnalyticsConfigModel,
} from '../internal/api';
import { ApiCredentials } from './apiCredentials';
import { validateString } from './validators';

export class AnalyticsConfigAPI {
  private internalApi: AnalyticsConfigApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new AnalyticsConfigApi(baseURL);
    this.internalApi.accessToken = apiKey;
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

    const headers: any = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (
      credentials?.projectId !== undefined &&
      credentials.projectId !== null
    ) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    const res =
      await this.internalApi.analyticsConfigControllerCreateAnalyticsConfig(
        config,
        { headers }
      );
    return res.body;
  }

  async getAnalyticsConfig(
    projectId: string,
    credentials?: ApiCredentials
  ): Promise<AnalyticsConfigResponse> {
    validateString(
      projectId,
      'The projectId must be provided as an input and has to be nonempty.'
    );

    const headers: any = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    const res =
      await this.internalApi.analyticsConfigControllerGetAnalyticsConfig(
        projectId,
        { headers }
      );
    return res.body;
  }

  async updateAnalyticsConfig(
    projectId: string,
    config: UpdateAnalyticsConfigModel
  ): Promise<AnalyticsConfigResponse> {
    validateString(
      projectId,
      'The projectId must be provided as an input and has to be nonempty.'
    );

    const res =
      await this.internalApi.analyticsConfigControllerUpdateAnalyticsConfig(
        projectId,
        config
      );
    return res.body;
  }

  async deleteAnalyticsConfig(
    projectId: string
  ): Promise<AnalyticsConfigResponse> {
    validateString(
      projectId,
      'The projectId must be provided as an input and has to be nonempty.'
    );

    const res =
      await this.internalApi.analyticsConfigControllerDeleteAnalyticsConfig(
        projectId
      );
    return res.body;
  }
}
