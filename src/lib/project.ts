import {
  Configuration,
  CreateProjectModel,
  LinkUserModel,
  ProjectApi,
  ProjectResponse,
  UserResponses,
} from '../internal/index';
import { ProjectResponses } from '../internal/models/ProjectResponses';
import { UserCredentials } from './auth';
import { ProjectIdentifier, UserIdentifier } from './identifiers';
import {
  validateProjectIdentifier,
  validateString,
  validateUserCredentials,
  validateUserIdentifier,
} from './validators';

export class ProjectAPI {
  private internalApi: ProjectApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new ProjectApi(
      new Configuration({ basePath: baseURL, accessToken: apiKey })
    );
  }

  async createProject(options: {
    projectName: string;
    credentials: UserCredentials;
  }): Promise<ProjectResponse> {
    const { projectName, credentials } = options;

    validateString(
      projectName,
      'The project name must be provided as an input and has to be nonempty.'
    );
    validateUserCredentials(credentials);

    const createProjectModel: CreateProjectModel = {
      name: projectName,
    };

    if (typeof credentials == 'string') {
      return await this.internalApi.projectControllerCreateProject(
        { createProjectModel },
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.projectControllerCreateProject({
        createProjectModel,
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }
  // Should be by ID or Name
  async getProject(input: ProjectIdentifier): Promise<ProjectResponse> {
    validateProjectIdentifier(input);

    return input.name
      ? await this.internalApi.projectControllerGetProjectByName({
          name: input.name,
        })
      : await this.internalApi.projectControllerGetProjectById({
          id: `${input.id}`,
        });
  }
  // Should be by ID or Name
  async linkProjectToUser(options: {
    project: ProjectIdentifier;
    user: UserIdentifier;
  }): Promise<void> {
    const { project, user } = options;

    validateProjectIdentifier(project);
    validateUserIdentifier(user);

    const linkUserModel: LinkUserModel = {};
    if (user.email) {
      linkUserModel.email = user.email;
    } else {
      linkUserModel.id = user.id;
    }

    if (project.name) {
      return await this.internalApi.projectControllerLinkUserWithProjectName({
        name: project.name,
        linkUserModel,
      });
    } else {
      return await this.internalApi.projectControllerLinkUserWithProjectId({
        id: project.id || -1,
        linkUserModel,
      });
    }
  }

  async getProjectUsersById(
    projectId: string,
    credentials: UserCredentials
  ): Promise<UserResponses> {
    validateUserCredentials(credentials);

    if (typeof credentials == 'string') {
      return await this.internalApi.projectControllerGetUsersByProject(
        { id: projectId },
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.projectControllerGetUsersByProject({
        id: projectId,
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }

  async getProjects(
    credentials: UserCredentials
  ): Promise<ProjectResponses> {
    validateUserCredentials(credentials);

    if (typeof credentials == 'string') {
      return await this.internalApi.projectControllerGetAllProjects(
        {},
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.projectControllerGetAllProjects({
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }

  async deleteProject(options: {
    project: ProjectIdentifier;
    credentials: UserCredentials;
  }): Promise<ProjectResponse> {
    const { project, credentials } = options;

    validateProjectIdentifier(project);
    validateUserCredentials(credentials);

    if (!project.id) {
      throw new Error('Project deletion is only supported by ID, not by name');
    }

    if (typeof credentials == 'string') {
      return await this.internalApi.projectControllerDeleteProjectById(
        { id: project.id.toString() },
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.projectControllerDeleteProjectById({
        id: project.id.toString(),
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }
}
