import {
  UserApi,
  LinkProjectModel,
  SetUserTypeModel,
  CreateUserModel,
  UserResponse,
} from '../internal/api';

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
    if (!email || email.trim().length === 0) {
      throw new Error('The email must be nonempty');
    }
    if (!name || name.trim().length === 0) {
      throw new Error('The name for the user must be nonempty');
    }
    if (!password || password.trim().length === 0) {
      throw new Error('The password for the user must be nonempty');
    }
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
    if (!userId || userId.trim().length === 0) {
      throw new Error('The user ID must be a non-empty string.');
    }
    if (!projectId) {
      throw new Error('The project ID information must be valid.');
    }
    if (!projectName || projectName.trim().length === 0) {
      throw new Error('The project name must be a non-empty string.');
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
    if (!email || email.trim().length === 0) {
      throw new Error('The email must be a non-empty string.');
    }

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
    if (!id || id.trim()) {
      throw new Error('The id must be nonempty');
    }
    try {
      const res = await this.internalApi.userControllerGetUserById(id);
      return res.body;
    } catch (e) {
      throw e;
    }
  }
}
