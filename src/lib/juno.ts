import { AuthAPI } from './auth';
import { EmailAPI } from './email';
import { ProjectAPI } from './project';
import { UserAPI } from './user';

class JunoAPI {
  private apiKey?: string;
  private userAPI: UserAPI;
  private emailAPI: EmailAPI;
  private projectAPI: ProjectAPI;
  private authAPI: AuthAPI;

  get user(): UserAPI {
    return this.userAPI;
  }

  get email(): EmailAPI {
    return this.emailAPI;
  }

  get project(): ProjectAPI {
    return this.projectAPI;
  }

  init(options: { apiKey: string; baseURL?: string }) {
    this.apiKey = options.apiKey;
    this.authAPI = new AuthAPI(options.baseURL, this.apiKey);
    this.userAPI = new UserAPI(options.baseURL);
    this.emailAPI = new EmailAPI(options.baseURL, this.authAPI);
    this.projectAPI = new ProjectAPI(options.baseURL);
  }
}

export const juno: JunoAPI = new JunoAPI();
