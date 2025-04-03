import {
  UserApi,
  LinkProjectModel,
  SetUserTypeModel,
  CreateUserModel,
  UserResponse,
  UserResponses,
} from '../internal/api';
import { validateString } from './validators';
export class UserAPI {
  private internalApi: UserApi;
  constructor(baseURL?: string) {
    this.internalApi = new UserApi(baseURL);
  }
  async createUser(options: {
    email: string;
    name: string;
    password: string;
    auth: string | { adminPassword: string; adminEmail: string };
  }): Promise<UserResponse> {
    let { email, name, password, auth } = options;

    validateString(email, 'The email must be nonempty');
    validateString(name, 'The name must be nonempty');
    validateString(password, 'The password must be nonempty');
    if (typeof auth == 'string') {
      validateString(auth, 'The jwtToken must be non-empty');
    } else {
      validateString(auth.adminEmail, 'The admin email must be nonempty');
      validateString(auth.adminPassword, 'The admin password must be nonempty');
    }

    email = email.trim();
    name = name.trim();
    password = password.trim();

    try {
      const createUserModel: CreateUserModel = { email, name, password };
      let res;
      if (typeof auth == 'string') {
        this.internalApi.accessToken = auth;
        res = await this.internalApi.userControllerCreateUser(createUserModel);
      } else {
        res = await this.internalApi.userControllerCreateUser(
          createUserModel,
          auth.adminPassword,
          auth.adminEmail
        );
      }
      return res.body;
    } catch (e) {
      throw e;
    }
  }
  async linkToProject(options: {
    userId: string;
    project: LinkProjectModel;
    auth: string | { adminPassword: string; adminEmail: string };
  }): Promise<UserResponse> {
    let { userId, project, auth } = options;

    validateString(userId, 'The user ID must be a non-empty string.');
    if (project.name) {
      project.name = project.name.trim();
      validateString(
        project.name,
        'The project name must be a non-empty string.'
      );
    }
    if (typeof auth == 'string') {
      validateString(auth, 'The jwtToken must be non-empty');
    } else {
      validateString(auth.adminEmail, 'The admin email must be nonempty');
      validateString(auth.adminPassword, 'The admin password must be nonempty');
    }
    try {
      let response;
      if (typeof auth == 'string') {
        this.internalApi.accessToken = auth;
        response = await this.internalApi.userControllerLinkUserWithProjectId(
          userId,
          project
        );
      } else {
        response = await this.internalApi.userControllerLinkUserWithProjectId(
          userId,
          project,
          auth.adminPassword,
          auth.adminEmail
        );
      }

      return response.body;
    } catch (e) {
      throw e;
    }
  }

  async setUserType(options: {
    input: SetUserTypeModel;
    auth: string | { adminPassword: string; adminEmail: string };
  }): Promise<UserResponse> {
    const { auth, input } = options;
    if (input.email) {
      input.email = input.email.trim();
      validateString(input.email, 'The email must be a non-empty string.');
    }
    if (typeof auth == 'string') {
      validateString(auth, 'The jwtToken must be non-empty');
    } else {
      validateString(auth.adminEmail, 'The admin email must be nonempty');
      validateString(auth.adminPassword, 'The admin password must be nonempty');
    }

    try {
      let response;
      if (typeof auth == 'string') {
        this.internalApi.accessToken = auth;
        response = await this.internalApi.userControllerSetUserType(input);
      } else {
        response = await this.internalApi.userControllerSetUserType(
          input,
          auth.adminPassword,
          auth.adminEmail
        );
      }
      return response.body;
    } catch (e) {
      throw e;
    }
  }
  async getUser(id: string): Promise<UserResponse> {
    validateString(id, 'The id must be nonempty');

    try {
      const res = await this.internalApi.userControllerGetUserById(id);
      return res.body;
    } catch (e) {
      throw e;
    }
  }

  async getUsers(
    adminEmail: string,
    adminPassword: string
  ): Promise<UserResponses> {
    validateString(adminEmail, 'The admin email must be nonempty');
    validateString(adminPassword, 'The admin password must be nonempty');

    try {
      const res = await this.internalApi.userControllerGetAllUsers(
        adminPassword,
        adminEmail
      );
      return res.body;
    } catch (e) {
      throw e;
    }
  }
}
