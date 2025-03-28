import {
  CreateProjectModel,
  LinkUserModel,
  ProjectApi,
  ProjectResponse,
  UserResponses,
} from '../internal/api';
import { ProjectResponses } from '../internal/model/projectResponses';
import { ProjectIdentifier, UserIdentifier } from './identifiers';
import {
  validateProjectIdentifier,
  validateUserIdentifier,
  validateString,
} from './validators';

export class ProjectAPI {
  private internalApi: ProjectApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new ProjectApi(baseURL);
    this.internalApi.accessToken = apiKey;
  }
  async createProject(options: {
    projectName: string;
    auth: string | { superadminPassword: string; superadminEmail: string };
  }): Promise<ProjectResponse> {
    const { projectName, auth } = options;

    validateString(
      projectName,
      'The project name must be provided as an input and has to be nonempty.'
    );
    if (typeof auth == 'string') {
      validateString(auth, 'The jwtToken must be non-empty');
    } else {
      validateString(auth.superadminEmail, 'The admin email must be nonempty');
      validateString(
        auth.superadminPassword,
        'The admin password must be nonempty'
      );
    }

    try {
      const createProjectModel = new CreateProjectModel();
      createProjectModel.name = projectName;

      let res;
      if (typeof auth == 'string') {
        res = await this.internalApi.projectControllerCreateProject(
          createProjectModel,
          undefined,
          undefined,
          {
            headers: { Authorization: `Bearer ${auth}` },
          }
        );
      } else {
        res = await this.internalApi.projectControllerCreateProject(
          createProjectModel,
          auth.superadminPassword,
          auth.superadminEmail
        );
      }
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

  async getProjectUsersById(
    projectId: string,
    adminEmail: string,
    adminPassword: string
  ): Promise<UserResponses> {
    validateString(adminEmail, 'The admin email must be nonempty');
    validateString(adminPassword, 'The admin password must be nonempty');

    try {
      const res = await this.internalApi.projectControllerGetUsersByProject(
        projectId,
        adminPassword,
        adminEmail
      );
      return res.body;
    } catch (e) {
      throw e;
    }
  }

  async getProjects(
    adminEmail: string,
    adminPassword: string
  ): Promise<ProjectResponses> {
    validateString(adminEmail, 'The admin email must be nonempty');
    validateString(adminPassword, 'The admin password must be nonempty');

    try {
      const res = await this.internalApi.projectControllerGetAllProjects(
        adminPassword,
        adminEmail
      );
      return res.body;
    } catch (e) {
      throw e;
    }
  }
}
