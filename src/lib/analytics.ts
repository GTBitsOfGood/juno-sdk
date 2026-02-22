import {
  AnalyticsApi,
  Configuration,
  ClickEventResponse,
  CustomEventResponse,
  GetAllCustomEventTypeResponse,
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
} from '../internal/index';
import { ApiCredentials } from './apiCredentials';
import { validateString } from './validators';

export class AnalyticsAPI {
  private internalApi: AnalyticsApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new AnalyticsApi(new Configuration({ basePath: baseURL, accessToken: apiKey }));
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

    return await this.internalApi.analyticsControllerLogClickEvent({ logClickEventRequest: event });
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

    return await this.internalApi.analyticsControllerGetClickEventsPaginated({
      projectName,
      afterId,
      environment,
      limit,
      afterTime,
    });
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

    return await this.internalApi.analyticsControllerLogVisitEvent({ logVisitEventRequest: event });
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

    return await this.internalApi.analyticsControllerGetVisitEventsPaginated({
      projectName,
      afterId,
      environment,
      limit,
      afterTime,
    });
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

    return await this.internalApi.analyticsControllerLogInputEvent({ logInputEventRequest: event });
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

    return await this.internalApi.analyticsControllerGetInputEventsPaginated({
      projectName,
      afterId,
      environment,
      limit,
      afterTime,
    });
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

    return await this.internalApi.analyticsControllerLogCustomEvent({ logCustomEventRequest: event });
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

    return await this.internalApi.analyticsControllerGetCustomEventsPaginated({
      projectName,
      category,
      subcategory,
      afterId,
      environment,
      limit,
      afterTime,
    });
  }

  async getCustomEventTypesByProject(
    projectName: string,
    credentials?: ApiCredentials
  ): Promise<GetAllCustomEventTypeResponse> {
    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined && credentials.projectId !== null) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.analyticsControllerGetCustomEventTypes(
      { projectName },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
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

    return await this.internalApi.analyticsControllerGetCustomGraphTypesById({
      projectName,
      eventTypeId,
    });
  }

  async getAllClickEvents(
    event: {
      projectName: string;
      afterTime?: string;
      limit?: number;
    },
    credentials?: ApiCredentials
  ): Promise<GetAllClickEventsResponse> {
    const { projectName, afterTime, limit } = event;

    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined && credentials.projectId !== null) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.analyticsControllerGetAllClickEvents(
      { projectName, afterTime, limit },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async getAllVisitEvents(
    event: {
      projectName: string;
      afterTime?: string;
      limit?: number;
    },
    credentials?: ApiCredentials
  ): Promise<GetAllVisitEventsResponse> {
    const { projectName, afterTime, limit } = event;

    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined && credentials.projectId !== null) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.analyticsControllerGetAllVisitEvents(
      { projectName, afterTime, limit },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async getAllInputEvents(
    event: {
      projectName: string;
      afterTime?: string;
      limit?: number;
    },
    credentials?: ApiCredentials
  ): Promise<GetAllInputEventsResponse> {
    const { projectName, afterTime, limit } = event;

    validateString(
      projectName,
      'The projectName must be provided as an input and has to be nonempty.'
    );

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined && credentials.projectId !== null) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.analyticsControllerGetAllInputEvents(
      { projectName, afterTime, limit },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async getAllCustomEvents(
    event: {
      projectName: string;
      category: string;
      subcategory: string;
      afterTime?: string;
      limit?: number;
    },
    credentials?: ApiCredentials
  ): Promise<GetAllCustomEventsResponse> {
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

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined && credentials.projectId !== null) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.internalApi.analyticsControllerGetAllCustomEvents(
      { projectName, category, subcategory, afterTime, limit },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }
}
