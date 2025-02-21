import {
  CreateProjectModel,
  LinkUserModel,
  ProjectApi,
  ProjectResponse,
} from '../internal/api';
import { ProjectIdentifier, UserIdentifier } from './identifiers';
import { validateProjectIdentifier, validateUserIdentifier, validateString } from './validators';


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
  async getProject(input: ProjectIdentifier): Promise<ProjectResponse> {
    validateProjectIdentifier(input);

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
    project: ProjectIdentifier;
    user: UserIdentifier;
  }): Promise<ProjectResponse> {
    const { project, user } = options;

    validateProjectIdentifier(project);
    validateUserIdentifier(user);

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
        );
      return res.body;
    } catch (e) {
      throw e;
    }
  }
}

