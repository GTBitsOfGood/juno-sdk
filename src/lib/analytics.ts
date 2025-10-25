import {
  AnalyticsApi,
  ClickEventResponse,
  CustomEventResponse,
  CustomEventTypeResponse,
  CustomGraphTypeResponse,
  GetAllClickEventsResponse,
  GetAllCustomEventsResponse,
  GetAllInputEventsResponse,
  GetAllVisitEventsResponse,
  GetClickEventsResponse,
  GetCustomEventsResponse,
  GetInputEventsResponse,
  GetVisitEventsResponse,
  InputEventResponse,
  LogClickEventRequest,
  LogCustomEventRequest,
  LogInputEventRequest,
  LogVisitEventRequest,
  VisitEventResponse,
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

  async getClickEventsPaginated(event: {
    projectName: string;
    afterId?: string;
    environment?: string;
    limit?: number;
    afterTime?: string;
  }): Promise<GetClickEventsResponse> {
    const { projectName, afterId, environment, limit, afterTime } = event;
    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const res =
      await this.internalApi.analyticsControllerGetClickEventsPaginated(
        projectName,
        afterId,
        environment,
        limit,
        afterTime
      );
    return res.body;
  }

  async logVisitEvent(
    event: LogVisitEventRequest
  ): Promise<VisitEventResponse> {
    validateString(
      event.pageUrl,
      'The pageUrl must be provided as an input and has to be nonempty.'
    );

    validateString(
      event.userId,
      'The userId must be provided as an input and has to be nonempty.'
    );

    const res = await this.internalApi.analyticsControllerLogVisitEvent(event);
    return res.body;
  }

  async getVisitEventsPaginated(event: {
    projectName: string;
    afterId?: string;
    environment?: string;
    limit?: number;
    afterTime?: string;
  }): Promise<GetVisitEventsResponse> {
    const { projectName, afterId, environment, limit, afterTime } = event;
    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const res =
      await this.internalApi.analyticsControllerGetVisitEventsPaginated(
        projectName,
        afterId,
        environment,
        limit,
        afterTime
      );
    return res.body;
  }

  async logInputEvent(
    event: LogInputEventRequest
  ): Promise<InputEventResponse> {
    validateString(
      event.objectId,
      'The objectId must be provided as an input and has to be nonempty.'
    );

    validateString(
      event.userId,
      'The userId must be provided as an input and has to be nonempty.'
    );

    const res = await this.internalApi.analyticsControllerLogInputEvent(event);
    return res.body;
  }

  async getInputEventsPaginated(event: {
    projectName: string;
    afterId?: string;
    environment?: string;
    limit?: number;
    afterTime?: string;
  }): Promise<GetInputEventsResponse> {
    const { projectName, afterId, environment, limit, afterTime } = event;
    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const res =
      await this.internalApi.analyticsControllerGetInputEventsPaginated(
        projectName,
        afterId,
        environment,
        limit,
        afterTime
      );
    return res.body;
  }

  async logCustomEvent(
    event: LogCustomEventRequest
  ): Promise<CustomEventResponse> {
    validateString(
      event.category,
      'The category must be provided as an input and has to be nonempty.'
    );

    validateString(
      event.subcategory,
      'The subcategory must be provided as an input and has to be nonempty.'
    );

    const res = await this.internalApi.analyticsControllerLogCustomEvent(event);
    return res.body;
  }

  async getCustomEventsPaginated(event: {
    projectName: string;
    category: string;
    subcategory: string;
    afterId?: string;
    environment?: string;
    limit?: number;
    afterTime?: string;
  }): Promise<GetCustomEventsResponse> {
    const {
      projectName,
      category,
      subcategory,
      afterId,
      environment,
      limit,
      afterTime,
    } = event;

    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    validateString(
      category,
      'The category must be provided as an input and has to be nonempty.'
    );

    validateString(
      subcategory,
      'The subcategory must be provided as an input and has to be nonempty.'
    );

    const res =
      await this.internalApi.analyticsControllerGetCustomEventsPaginated(
        projectName,
        category,
        subcategory,
        afterId,
        environment,
        limit,
        afterTime
      );
    return res.body;
  }

  async getCustomEventTypesByProject(
    projectName: string
  ): Promise<CustomEventTypeResponse> {
    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const res = await this.internalApi.analyticsControllerGetCustomEventTypes(
      projectName
    );

    return res.body;
  }

  async getCustomGraphTypesById(data: {
    projectName: string;
    eventTypeId: string;
  }): Promise<CustomGraphTypeResponse> {
    const { projectName, eventTypeId } = data;
    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    validateString(
      eventTypeId,
      'The eventTypeId must be provided as an input and has to be nonempty.'
    );

    const res =
      await this.internalApi.analyticsControllerGetCustomGraphTypesById(
        projectName,
        eventTypeId
      );

    return res.body;
  }

  async getAllClickEvents(event: {
    projectName: string;
    afterTime?: string;
    limit?: number;
  }): Promise<GetAllClickEventsResponse> {
    const { projectName, afterTime, limit } = event;

    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const res = await this.internalApi.analyticsControllerGetAllClickEvents(
      projectName,
      afterTime,
      limit
    );
    return res.body;
  }

  async getAllVisitEvents(event: {
    projectName: string;
    afterTime?: string;
    limit?: number;
  }): Promise<GetAllVisitEventsResponse> {
    const { projectName, afterTime, limit } = event;

    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const res = await this.internalApi.analyticsControllerGetAllVisitEvents(
      projectName,
      afterTime,
      limit
    );
    return res.body;
  }

  async getAllInputEvents(event: {
    projectName: string;
    afterTime?: string;
    limit?: number;
  }): Promise<GetAllInputEventsResponse> {
    const { projectName, afterTime, limit } = event;

    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const res = await this.internalApi.analyticsControllerGetAllInputEvents(
      projectName,
      afterTime,
      limit
    );
    return res.body;
  }

  async getAllCustomEvents(event: {
    projectName: string;
    category: string;
    subcategory: string;
    afterTime?: string;
    limit?: number;
  }): Promise<GetAllCustomEventsResponse> {
    const { projectName, category, subcategory, afterTime, limit } = event;

    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    validateString(
      category,
      'The category must be provided as an input and has to be nonempty.'
    );

    validateString(
      subcategory,
      'The subcategory must be provided as an input and has to be nonempty.'
    );

    const res = await this.internalApi.analyticsControllerGetAllCustomEvents(
      projectName,
      category,
      subcategory,
      afterTime,
      limit
    );
    return res.body;
  }
}
