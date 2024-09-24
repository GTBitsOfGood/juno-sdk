import { UserApi, LinkProjectModel, SetUserTypeModel, CreateUserModel, UserResponse } from '../internal/api';
import http from 'http';

type UserAPI = {
  getUser: (id: string, options: { headers: { [name: string]: string } });
  createUser: (email: string, name: string, password: string, options: { headers: { [name: string]: string } }) => Promise<UserResponse>;
  linkToProject: (userId: string, projectId: number, projectName: string, options?: { headers?: { [name: string]: string } }) => Promise<UserResponse>;
  setUserType: (email: string, id: number, type: number, options?: { headers?: { [name: string]: string } }) => Promise<UserResponse>;
};

const userApi = new UserApi();

export const userAPI: UserAPI = {
  createUser: async (email: string, name: string, password: string, options: { headers: { [name: string]: string } } = { headers: {} }): Promise<UserResponse> => {
    if (!email || email.trim().length === 0) {
      throw new Error('The email must be nonempty');
    }
    if (!name || name.trim().length === 0) {
      throw new Error('The name for the user must be nonempty');
    }
    if (!password || password.trim().length === 0) {
      throw new Error('The password for the user must be nonempty');
    }
    email = email.trim()
    name = name.trim()
    password = password.trim()

    try {
      const createUserModel: CreateUserModel = { email, name, password }
      const res = await userApi.userControllerCreateUser(createUserModel, options)
      return res.body;
    } catch (e) {
      throw e;
    }

  },
  linkToProject: async (userId: string, projectId: number, projectName: string, options?: { headers?: { [name: string]: string } }): Promise<UserResponse> => {
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

    const headers = options?.headers || {};

    try {
      const response = await userApi.userControllerLinkUserWithProjectId(userId.trim(), linkProjectModel, { headers });
      return response.body;
    } catch (e) {
      throw e;
    }
  },
  setUserType: async (email: string, id: number, type: number, options?: { headers?: { [name: string]: string } }): Promise<UserResponse> => {
    if (!email || email.trim().length === 0) {
      throw new Error('The email must be a non-empty string.');
    }

    const setUserTypeModel: SetUserTypeModel = {
      email: email.trim(),
      id,
      type,
    };

    const headers = options?.headers || {};

    try {
      const response = await userApi.userControllerSetUserType(setUserTypeModel, { headers });
      return response.body;
    } catch (e) {
      throw e;
    }
  },
  getUser: async (id: string, options: { headers: { [name: string]: string } } = { headers: {} }): Promise<UserResponse> => {
    if (!id || id.trim()) {
      throw new Error('The id must be nonempty');
    }
    try {
      const res = await userApi.userControllerGetUserById(id, options);
      return res.body;
    } catch (e) {
      throw e;
    }

  }
}
