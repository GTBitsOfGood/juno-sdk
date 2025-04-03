import { IncomingMessage } from 'http';
import {
  UserApi,
  LinkProjectModel,
  SetUserTypeModel,
  CreateUserModel,
  UserResponse,
  UserResponses,
} from '../internal/api';
import { UserCredentials } from './auth';
import { validateString, validateUserCredentials } from './validators';

export class UserAPI {
  private internalApi: UserApi;
  constructor(baseURL?: string) {
    this.internalApi = new UserApi(baseURL);
  }
  async createUser(options: {
    email: string;
    name: string;
    password: string;
    credentials: UserCredentials
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
    let res: { body: any; response?: IncomingMessage; };

    if (typeof credentials == 'string') {
      this.internalApi.accessToken = credentials;
      res = await this.internalApi.userControllerCreateUser(createUserModel);
    } else {
      res = await this.internalApi.userControllerCreateUser(
        createUserModel,
        credentials.password,
        credentials.email
      );
    }
    return res.body;
  }
  async linkToProject(options: {
    userId: string;
    project: LinkProjectModel;
    credentials: UserCredentials
  }): Promise<UserResponse> {
    let { userId, project, credentials } = options;

    validateString(userId, 'The user ID must be a non-empty string.');
    if (project.name) {
      project.name = project.name.trim();
      validateString(
        project.name,
        'The project name must be a non-empty string.'
      );
    }

    validateUserCredentials(credentials);

    let response: { body?: any; response?: IncomingMessage; };

    if (typeof credentials == 'string') {
      this.internalApi.accessToken = credentials;
      response = await this.internalApi.userControllerLinkUserWithProjectId(
        userId,
        project
      );
    } else {
      response = await this.internalApi.userControllerLinkUserWithProjectId(
        userId,
        project,
        credentials.password,
        credentials.email
      );
    }

    return response.body;
  }

  async setUserType(options: {
    input: SetUserTypeModel;
    credentials: UserCredentials
  }): Promise<UserResponse> {
    const { input, credentials } = options;
    if (input.email) {
      input.email = input.email.trim();
      validateString(input.email, 'The email must be a non-empty string.');
    }

    validateUserCredentials(credentials);

    let res: { response: IncomingMessage; body: UserResponse; };
    if (typeof credentials == 'string') {
      this.internalApi.accessToken = credentials;
      res = await this.internalApi.userControllerSetUserType(input);
    } else {
      res = await this.internalApi.userControllerSetUserType(
        input,
        credentials.password,
        credentials.email
      );
    }
    return res.body;
  }

  async getUser(id: string): Promise<UserResponse> {
    validateString(id, 'The id must be nonempty');

    const res = await this.internalApi.userControllerGetUserById(id);
    return res.body;
  }

  async getUsers(
    credentials: UserCredentials
  ): Promise<UserResponses> {
    validateUserCredentials(credentials);

    let res: { body: any; response?: IncomingMessage; };

    if (typeof credentials == 'string') {
      this.internalApi.accessToken = credentials;
      res = await this.internalApi.userControllerGetAllUsers(undefined, undefined);
    } else {
      res = await this.internalApi.userControllerGetAllUsers(
        credentials.password,
        credentials.email
      );
    }

    return res.body;
  }
}
