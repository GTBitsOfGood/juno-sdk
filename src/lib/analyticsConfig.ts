import {
  AnalyticsConfigApi,
  AnalyticsConfigResponse,
  CreateAnalyticsConfigModel,
  UpdateAnalyticsConfigModel,
} from '../internal/api';
import { validateString } from './validators';

export class AnalyticsConfigAPI {
  private internalApi: AnalyticsConfigApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new AnalyticsConfigApi(baseURL);
    this.internalApi.accessToken = apiKey;
  }

  async createAnalyticsConfig(
    config: CreateAnalyticsConfigModel
  ): Promise<AnalyticsConfigResponse> {
    validateString(
      config.clientAnalyticsKey,
      'The clientAnalyticsKey must be provided as an input and has to be nonempty.'
    );

    validateString(
      config.serverAnalyticsKey,
      'The serverAnalyticsKey must be provided as an input and has to be nonempty.'
    );

    const res =
      await this.internalApi.analyticsConfigControllerCreateAnalyticsConfig(
        config
      );
    return res.body;
  }

  async getAnalyticsConfig(
    projectId: string
  ): Promise<AnalyticsConfigResponse> {
    validateString(
      projectId,
      'The projectId must be provided as an input and has to be nonempty.'
    );

    const res =
      await this.internalApi.analyticsConfigControllerGetAnalyticsConfig(
        projectId
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
