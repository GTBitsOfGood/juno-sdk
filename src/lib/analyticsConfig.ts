import { AnalyticsConfigApi } from '../internal/api';

export class AnalyticsConfigAPI {
  private internalApi: AnalyticsConfigApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new AnalyticsConfigApi(baseURL);
    this.internalApi.accessToken = apiKey;
  }
}
