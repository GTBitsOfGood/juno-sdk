import { AuthAPI } from './auth';
import { EmailAPI } from './email';
import { JunoValidationError } from './errors';
import { ProjectAPI } from './project';
import { UserAPI } from './user';

class JunoAPI {
  private apiKey?: string;
  private userAPI?: UserAPI;
  private emailAPI?: EmailAPI;
  private projectAPI?: ProjectAPI;
  private authAPI?: AuthAPI;

  get user(): UserAPI {
    if (!this.userAPI) {
      throw new JunoValidationError(
        'juno.init() must be called before using the Juno SDK'
      );
    }
    return this.userAPI;
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
  }
}

export const juno: JunoAPI = new JunoAPI();
