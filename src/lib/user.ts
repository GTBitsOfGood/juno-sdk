import {
  UserApi,
  LinkProjectModel,
  SetUserTypeModel,
  CreateUserModel,
  UserResponse,
} from '../internal/api';
import JunoError from './errors';
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

    validateString(email, "The email must be nonempty");
    validateString(name, "The name must be nonempty");
    validateString(password, "The password must be nonempty");
    validateString(adminEmail, "The admin email must be nonempty");
    validateString(adminPassword, "The admin password must be nonempty");

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
    projectId: number;
    projectName: string;
    email: string;
    password: string;
  }): Promise<UserResponse> {
    let { userId, projectId, projectName, email, password } = options;

    validateString(userId, "The user ID must be a non-empty string.");
    validateString(projectName, "The project name must be a non-empty string.");
    validateString(email, "The email must be a non-empty string.");
    validateString(password, "The password must be a non-empty string.");

    if (!projectId) {
      throw new JunoError('The project ID information must be valid.');
    }

    const linkProjectModel: LinkProjectModel = {
      id: projectId,
      name: projectName.trim(),
    };

    try {
      const response =
        await this.internalApi.userControllerLinkUserWithProjectId(
          userId,
          password,
          email,
          linkProjectModel
        );
      return response.body;
    } catch (e) {
      throw e;
    }
  }

  async setUserType(options: {
    email: string;
    type: number;
    adminEmail: string;
    adminPassword: string;
  }): Promise<UserResponse> {
    const { email, type, adminEmail, adminPassword } = options;

    validateString(email, "The email must be a non-empty string.");

    const setUserTypeModel: SetUserTypeModel = {
      email: email.trim(),
      type,
    };

    try {
      const response = await this.internalApi.userControllerSetUserType(
        adminPassword,
        adminEmail,
        setUserTypeModel
      );
      return response.body;
    } catch (e) {
      throw e;
    }
  }
  async getUser(id: string): Promise<UserResponse> {
    validateString(id, "The id must be nonempty");

    try {
      const res = await this.internalApi.userControllerGetUserById(id);
      return res.body;
    } catch (e) {
      throw e;
    }
  }
}
