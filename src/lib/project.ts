import { CreateProjectModel, LinkUserModel, ProjectApi } from '../internal/api';
import http from 'http';

// syntax error if name and both id are provided, only either or can be provided
type projectInputType =
  | {
      name: string;
      id?: never;
    }
  | {
      id: string;
      name?: never;
    };

type ProjectAPI = {
  createProject: (projectName: string) => Promise<ProjectResponseType>;
  // Should be by ID or Name
  getProject: (input: projectInputType) => Promise<ProjectResponseType>;
  // Should be by ID or Name
  linkProjectToUser: (
    input: projectInputType,
    email: string,
    id: number
  ) => Promise<ProjectResponseType>;
};

type ProjectResponseType = {
  response: http.IncomingMessage;
  body?: any;
};

const projectApi = new ProjectApi();

export const projectAPI: ProjectAPI = {
  createProject: async function (
    projectName: string
  ): Promise<ProjectResponseType> {
    try {
      const createProjectModel = new CreateProjectModel();
      createProjectModel.name = projectName;

      const res = await projectApi.projectControllerCreateProject(
        createProjectModel
      );
      return res;
    } catch (e) {
      throw new Error(e);
    }
  },

  getProject: async function (
    input: projectInputType
  ): Promise<ProjectResponseType> {
    try {
      const res = input.id
        ? await projectApi.projectControllerGetProjectById(input.id)
        : await projectApi.projectControllerGetProjectByName(input.name);
      return res;
    } catch (e) {
      throw new Error(e);
    }
  },

  linkProjectToUser: async function (
    input: projectInputType,
    email: string,
    id: number
  ): Promise<ProjectResponseType> {
    try {
      const linkUserModel = new LinkUserModel();
      linkUserModel.email = email;
      linkUserModel.id = id;

      const res = input.id
        ? await projectApi.projectControllerLinkUserWithProjectId(
            input.id,
            linkUserModel
          )
        : await projectApi.projectControllerLinkUserWithProjectName(
            input.name,
            linkUserModel
          );
      return res;
    } catch (e) {
      throw new Error(e);
    }
  },
};
