import {
  UserApi,
  Configuration,
  LinkProjectModel,
  SetUserTypeModel,
  CreateUserModel,
  UserResponse,
  UserResponses,
  UnlinkProjectModel,
} from '../internal/index';
import { UserCredentials } from './auth';
import { validateString, validateUserCredentials } from './validators';

export class UserAPI {
  private internalApi: UserApi;
  constructor(baseURL?: string) {
    this.internalApi = new UserApi(new Configuration({ basePath: baseURL }));
  }
  async createUser(options: {
    email: string;
    name: string;
    password: string;
    credentials: UserCredentials;
  }): Promise<UserResponse> {
    let { email, name, password, credentials } = options;

    validateString(email, 'The email must be nonempty');
    validateString(name, 'The name must be nonempty');
    validateString(password, 'The password must be nonempty');
    validateUserCredentials(credentials);

    email = email.trim();
    name = name.trim();
    password = password.trim();

    const createUserModel: CreateUserModel = { email, name, password };

    if (typeof credentials == 'string') {
      return await this.internalApi.userControllerCreateUser(
        { createUserModel },
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.userControllerCreateUser({
        createUserModel,
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }
  async linkToProject(options: {
    userId: string;
    project: LinkProjectModel;
    credentials: UserCredentials;
  }): Promise<UserResponse> {
    let { userId, project, credentials } = options;

    validateString(userId, 'The user ID must be a non-empty string.');
    if (project.name) {
      validateString(
        project.name,
        'The project name must be a non-empty string.'
      );
      project.name = project.name.trim();
    }

    validateUserCredentials(credentials);

    if (typeof credentials == 'string') {
      return await this.internalApi.userControllerLinkUserWithProjectId(
        { id: userId, linkProjectModel: project },
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.userControllerLinkUserWithProjectId({
        id: userId,
        linkProjectModel: project,
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }

  async setUserType(options: {
    input: SetUserTypeModel;
    credentials: UserCredentials;
  }): Promise<UserResponse | null | undefined> {
    const { input, credentials } = options;
    if (input.email) {
      input.email = input.email.trim();
      validateString(input.email, 'The email must be a non-empty string.');
    }

    validateUserCredentials(credentials);

    if (typeof credentials == 'string') {
      return await this.internalApi.userControllerSetUserType(
        { setUserTypeModel: input },
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.userControllerSetUserType({
        setUserTypeModel: input,
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }

  async getUser(id: string): Promise<UserResponse> {
    validateString(id, 'The id must be nonempty');

    return await this.internalApi.userControllerGetUserById({ id });
  }

  async getUsers(credentials: UserCredentials): Promise<UserResponses> {
    validateUserCredentials(credentials);

    if (typeof credentials == 'string') {
      return await this.internalApi.userControllerGetAllUsers(
        {},
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.userControllerGetAllUsers({
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }

  async unlinkFromProject(options: {
    userId: string;
    project: UnlinkProjectModel;
    credentials: UserCredentials;
  }): Promise<UserResponse> {
    let { userId, project, credentials } = options;

    validateString(userId, 'The user ID must be a non-empty string.');

    if (project.name) {
      validateString(
        project.name,
        'The project name must be a non-empty string.'
      );
      project.name = project.name.trim();
    }

    validateUserCredentials(credentials);

    if (typeof credentials == 'string') {
      return await this.internalApi.userControllerUnlinkUserFromProject(
        { id: userId, unlinkProjectModel: project },
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.userControllerUnlinkUserFromProject({
        id: userId,
        unlinkProjectModel: project,
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }

  async deleteUser(options: {
    userId: string;
    credentials: UserCredentials;
  }): Promise<UserResponse> {
    let { userId, credentials } = options;

    validateString(userId, 'The user ID must be a non-empty string.');
    validateUserCredentials(credentials);

    if (typeof credentials == 'string') {
      return await this.internalApi.userControllerDeleteUserById(
        { id: userId },
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
    } else {
      return await this.internalApi.userControllerDeleteUserById({
        id: userId,
        xUserPassword: credentials.password,
        xUserEmail: credentials.email,
      });
    }
  }
}
