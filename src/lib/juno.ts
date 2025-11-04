import { AnalyticsAPI } from './analytics';
import { AnalyticsConfigAPI } from './analyticsConfig';
import { AuthAPI } from './auth';
import { EmailAPI } from './email';
import { FileAPI } from './file';
import { JunoValidationError } from './errors';
import { ProjectAPI } from './project';
import { SettingsAPI } from './settings';
import { UserAPI } from './user';

class JunoAPI {
  private apiKey?: string;
  private userAPI?: UserAPI;
  private emailAPI?: EmailAPI;
  private projectAPI?: ProjectAPI;
  private authAPI?: AuthAPI;
  private settingsAPI?: SettingsAPI;
  private analyticsAPI?: AnalyticsAPI;
  private analyticsConfigAPI?: AnalyticsConfigAPI;
  private fileAPI?: FileAPI;

  get analyticsConfig(): AnalyticsConfigAPI {
    if (!this.analyticsConfigAPI) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.analyticsConfigAPI;
  }

  get analytics(): AnalyticsAPI {
    if (!this.analyticsAPI) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.analyticsAPI;
  }

  get user(): UserAPI {
    if (!this.userAPI) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.userAPI;
  }

  get settings(): SettingsAPI {
    if (!this.settingsAPI) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.settingsAPI;
  }

  get email(): EmailAPI {
    if (!this.emailAPI) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.emailAPI;
  }

  get project(): ProjectAPI {
    if (!this.projectAPI) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.projectAPI;
  }
  get file(): FileAPI {
    if (!this.fileAPI) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.fileAPI;
  }
  get auth(): AuthAPI {
    if (!this.authAPI) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.authAPI;
  }

  init(options: { apiKey: string; baseURL?: string }) {
    this.apiKey = options.apiKey;
    this.authAPI = new AuthAPI(options.baseURL, this.apiKey);
    this.userAPI = new UserAPI(options.baseURL);
    this.emailAPI = new EmailAPI(options.baseURL, this.authAPI);
    this.projectAPI = new ProjectAPI(options.baseURL, this.apiKey);
    this.settingsAPI = new SettingsAPI(options.baseURL, this.apiKey);
    this.analyticsAPI = new AnalyticsAPI(options.baseURL, this.apiKey);
    this.analyticsConfigAPI = new AnalyticsConfigAPI(
      options.baseURL,
      this.apiKey
    );
    this.fileAPI = new FileAPI(options.baseURL, this.apiKey);
  }
}

export const juno: JunoAPI = new JunoAPI();
