import {
  UserApi,
  LinkProjectModel,
  SetUserTypeModel,
  CreateUserModel,
  UserResponse,
} from '../internal/api';
import { EmailAPI } from './email';
import { JunoValidationError } from './errors';
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
    adminEmail: string;
    adminPassword: string;
  }): Promise<UserResponse> {
    let { email, name, password, adminEmail, adminPassword } = options;

    validateString(email, 'The email must be nonempty');
    validateString(name, 'The name must be nonempty');
    validateString(password, 'The password must be nonempty');
    validateString(adminEmail, 'The admin email must be nonempty');
    validateString(adminPassword, 'The admin password must be nonempty');

    email = email.trim();
    name = name.trim();
    password = password.trim();

    try {
      const createUserModel: CreateUserModel = { email, name, password };
      const res = await this.internalApi.userControllerCreateUser(
        adminPassword,
        adminEmail,
        createUserModel
      );
      return res.body;
    } catch (e) {
      throw e;
    }
  }
  async linkToProject(options: {
    userId: string;
    project: LinkProjectModel;
    adminEmail: string;
    adminPassword: string;
  }): Promise<UserResponse> {
    let { userId, project, adminEmail, adminPassword } = options;

    validateString(userId, 'The user ID must be a non-empty string.');
    if (project.name) {
      project.name = project.name.trim();
      validateString(
        project.name,
        'The project name must be a non-empty string.'
      );
    }
    validateString(adminEmail, 'The admin email must be nonempty');
    validateString(adminPassword, 'The admin password must be nonempty');

    try {
      const response =
        await this.internalApi.userControllerLinkUserWithProjectId(
          userId,
          adminPassword,
          adminEmail,
          project
        );
      return response.body;
    } catch (e) {
      throw e;
    }
  }

  async setUserType(options: {
    input: SetUserTypeModel;
    adminEmail: string;
    adminPassword: string;
  }): Promise<UserResponse> {
    const { adminEmail, adminPassword, input } = options;
    if (input.email) {
      input.email = input.email.trim();
      validateString(input.email, 'The email must be a non-empty string.');
    }

    try {
      const response = await this.internalApi.userControllerSetUserType(
        adminPassword,
        adminEmail,
        input
      );
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
}
