import { IncomingMessage } from 'http';
import {
  CreateProjectModel,
  LinkUserModel,
  ProjectApi,
  ProjectResponse,
  UserResponses,
} from '../internal/api';
import { UserCredentials } from './auth';
import { ProjectResponses } from '../internal/model/projectResponses';
import { ProjectIdentifier, UserIdentifier } from './identifiers';
import {
  validateProjectIdentifier,
  validateUserIdentifier,
  validateString,
  validateUserCredentials,
} from './validators';

export class ProjectAPI {
  private internalApi: ProjectApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new ProjectApi(baseURL);
    this.internalApi.accessToken = apiKey;
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

    const createProjectModel = new CreateProjectModel();
    createProjectModel.name = projectName;

    let res: { body: any; response?: IncomingMessage };
    if (typeof credentials == 'string') {
      this.internalApi.accessToken = credentials;
      res = await this.internalApi.projectControllerCreateProject(
        createProjectModel,
        undefined,
        undefined
      );
    } else {
      res = await this.internalApi.projectControllerCreateProject(
        createProjectModel,
        credentials.password,
        credentials.email
      );
    }
    return res.body;
  }
  // Should be by ID or Name
  async getProject(input: ProjectIdentifier): Promise<ProjectResponse> {
    validateProjectIdentifier(input);

    const res = input.name
      ? await this.internalApi.projectControllerGetProjectByName(input.name)
      : await this.internalApi.projectControllerGetProjectById(`${input.id}`);
    return res.body;
  }
  // Should be by ID or Name
  async linkProjectToUser(options: {
    project: ProjectIdentifier;
    user: UserIdentifier;
  }): Promise<ProjectResponse> {
    const { project, user } = options;

    validateProjectIdentifier(project);
    validateUserIdentifier(user);

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
  }

  async getProjectUsersById(
    projectId: string,
    credentials: UserCredentials
  ): Promise<UserResponses> {
    validateUserCredentials(credentials);

    let res: { body: any; response?: IncomingMessage };

    if (typeof credentials == 'string') {
      this.internalApi.accessToken = credentials;
      res = await this.internalApi.projectControllerGetUsersByProject(
        projectId,
        undefined,
        undefined
      );
    } else {
      res = await this.internalApi.projectControllerGetUsersByProject(
        projectId,
        credentials.password,
        credentials.email
      );
    }

    return res.body;
  }

  async getProjects(credentials: UserCredentials): Promise<ProjectResponses> {
    validateUserCredentials(credentials);

    let res: { body?: any; response?: IncomingMessage };

    if (typeof credentials == 'string') {
      this.internalApi.accessToken = credentials;
      res = await this.internalApi.projectControllerGetAllProjects(
        undefined,
        undefined
      );
    } else {
      res = await this.internalApi.projectControllerGetAllProjects(
        credentials.password,
        credentials.email
      );
    }

    return res.body;
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

    let res: { body: any; response?: IncomingMessage };

    if (typeof credentials == 'string') {
      this.internalApi.accessToken = credentials;
      res = await this.internalApi.projectControllerDeleteProjectById(
        project.id.toString(),
        undefined,
        undefined
      );
    } else {
      res = await this.internalApi.projectControllerDeleteProjectById(
        project.id.toString(),
        credentials.password,
        credentials.email
      );
    }

    return res.body;
  }
}
