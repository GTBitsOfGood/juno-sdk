import {
  AnalyticsApi,
  ClickEventResponse,
  LogClickEventRequest,
} from '../internal/api';
import { validateString } from './validators';

export class AnalyticsAPI {
  private internalApi: AnalyticsApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new AnalyticsApi(baseURL);
    this.internalApi.accessToken = apiKey;
  }

  async logClickEvent(
    event: LogClickEventRequest
  ): Promise<ClickEventResponse> {
    validateString(
      event.objectId,
      'The objectId must be provided as an input and has to be nonempty.'
    );

    validateString(
      event.userId,
      'The userId must be provided as an input and has to be nonempty.'
    );

    const res = await this.internalApi.analyticsControllerLogClickEvent(event);
    return res.body;
  }
}
