import { EmailAPI, emailAPI } from './email';
import { ProjectAPI, projectAPI } from './project';
import { UserAPI, userAPI } from './user';

type JunoAPI = {
  apiKey?: string;
  init: (options: { apiKey: string }) => void;
  user: UserAPI;
  email: EmailAPI;
  project: ProjectAPI;
};

export const juno: JunoAPI = {
  apiKey: undefined,
  init: function (options: { apiKey: string }): void {
    this.apiKey = options.apiKey;
  },
  user: userAPI,
  email: emailAPI,
  project: projectAPI,
};
