import { CreateProjectModel, LinkUserModel, ProjectApi } from '../internal/api';
import http from 'http';

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
  // Shou;d be by ID or Name
  getProject: (input: projectInputType) => Promise<ProjectResponseType>;
  // Shou;d be by ID or Name
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
    const createProjectModel = new CreateProjectModel();
    createProjectModel.name = projectName;

    return await projectApi.projectControllerCreateProject(createProjectModel);
  },

  getProject: async function (
    input: projectInputType
  ): Promise<ProjectResponseType> {
    return input.id
      ? await projectApi.projectControllerGetProjectById(input.id)
      : await projectApi.projectControllerGetProjectByName(input.name);
  },

  linkProjectToUser: async function (
    input: projectInputType,
    email: string,
    id: number
  ): Promise<ProjectResponseType> {
    const linkUserModel = new LinkUserModel();
    linkUserModel.email = email;
    linkUserModel.id = id;

    return input.id
      ? await projectApi.projectControllerLinkUserWithProjectId(
          input.id,
          linkUserModel
        )
      : await projectApi.projectControllerLinkUserWithProjectName(
          input.name,
          linkUserModel
        );
  },
};
