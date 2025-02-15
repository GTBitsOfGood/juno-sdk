import {
  CreateProjectModel,
  LinkUserModel,
  ProjectApi,
  ProjectResponse,
} from '../internal/api';
import { JunoValidationError } from './errors';
import { validateString } from './validators';

// syntax error if name and both id are provided, only either or can be provided
type projectInputType =
  | {
      name: string;
      id?: never;
    }
  | {
      id: number;
      name?: never;
    };

type userInputType =
  | {
      email: string;
      id?: never;
    }
  | {
      id: number;
      email?: never;
    };

export class ProjectAPI {
  private internalApi: ProjectApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new ProjectApi(baseURL);
    this.internalApi.accessToken = apiKey;
  }
  async createProject(options: {
    projectName: string;
    superadminEmail: string;
    superadminPassword: string;
  }): Promise<ProjectResponse> {
    const { projectName, superadminEmail, superadminPassword } = options;

    validateString(
      projectName,
      'The project name must be provided as an input and has to be nonempty.'
    );
    validateString(
      superadminEmail,
      'The superadmin email must be provided as an input and has to be nonempty.'
    );
    validateString(
      superadminPassword,
      'The superadmin password must be provided as an input and has to be nonempty.'
    );

    try {
      const createProjectModel = new CreateProjectModel();
      createProjectModel.name = projectName;

      const res = await this.internalApi.projectControllerCreateProject(
        superadminPassword,
        superadminEmail,
        createProjectModel
      );
      return res.body;
    } catch (e) {
      throw e;
    }
  }
  // Should be by ID or Name
  async getProject(input: projectInputType): Promise<ProjectResponse> {
    checkProjectInput(input);

    try {
      const res = input.name
        ? await this.internalApi.projectControllerGetProjectByName(input.name)
        : await this.internalApi.projectControllerGetProjectById(`${input.id}`);
      return res.body;
    } catch (e) {
      throw e;
    }
  }
  // Should be by ID or Name
  async linkProjectToUser(options: {
    project: projectInputType;
    user: userInputType;
  }): Promise<ProjectResponse> {
    const { project, user } = options;

    checkProjectInput(project);
    checkUserInput(user);

    try {
      const linkUserModel = new LinkUserModel();
      if (user.email) {
        linkUserModel.email = user.email;
      } else {
        linkUserModel.id = user.id;
      }

      const res = project.name
        ? await this.internalApi.projectControllerLinkUserWithProjectName(
          project.name,
          linkUserModel
          )
        : await this.internalApi.projectControllerLinkUserWithProjectId(
            project.id,
            linkUserModel
          )
      return res.body;
    } catch (e) {
      throw e;
    }
  }
}

const checkProjectInput = (input: projectInputType) => {
  if (!input) {
    throw new JunoValidationError(
      'The project input provided must include either the id or name and cannot be null.'
    );
  }

  if (input.name) {
    validateString(input.name, 'The given project string is invalid.');
  }
};

const checkUserInput = (input: userInputType) => {
  if (!input) {
    throw new JunoValidationError(
      'The user input provided must include either the id or email and cannot be null.'
    );
  }

  if (input.email) {
    validateString(input.email, 'The given user email string is invalid.');
  }
};