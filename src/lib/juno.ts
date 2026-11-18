import { AnalyticsClient } from './analytics';
import { AnalyticsConfigClient } from './analyticsConfig';
import { AuthClient } from './auth';
import { EmailClient } from './email';
import { JunoValidationError } from './errors';
import { FileClient } from './file';
import { ProjectClient } from './project';
import { UserClient } from './user';

export class JunoClient {
  private apiKey?: string;
  private userClient?: UserClient;
  private emailClient?: EmailClient;
  private projectClient?: ProjectClient;
  private authClient?: AuthClient;
  private analyticsClient?: AnalyticsClient;
  private analyticsConfigClient?: AnalyticsConfigClient;
  private fileClient?: FileClient;

  get analyticsConfig(): AnalyticsConfigClient {
    if (!this.analyticsConfigClient) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.analyticsConfigClient;
  }

  get analytics(): AnalyticsClient {
    if (!this.analyticsClient) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.analyticsClient;
  }

  get user(): UserClient {
    if (!this.userClient) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.userClient;
  }

  get email(): EmailClient {
    if (!this.emailClient) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.emailClient;
  }

  get project(): ProjectClient {
    if (!this.projectClient) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.projectClient;
  }
  get file(): FileClient {
    if (!this.fileClient) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.fileClient;
  }
  get auth(): AuthClient {
    if (!this.authClient) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.authClient;
  }

  init(options: { apiKey: string; baseURL?: string }) {
    this.apiKey = options.apiKey;
    this.authClient = new AuthClient(options.baseURL, this.apiKey);
    this.userClient = new UserClient(options.baseURL);
    this.emailClient = new EmailClient(options.baseURL, this.authClient);
    this.projectClient = new ProjectClient(options.baseURL, this.apiKey);
    this.analyticsClient = new AnalyticsClient(options.baseURL, this.apiKey);
    this.analyticsConfigClient = new AnalyticsConfigClient(
      options.baseURL,
      this.apiKey
    );
    this.fileClient = new FileClient(options.baseURL, this.apiKey);
  }
}

export const juno: JunoClient = new JunoClient();

/**
 * @deprecated Renamed to {@link JunoClient} to avoid confusion with the generated `*Api` classes.
 */
export type JunoAPI = JunoClient;
