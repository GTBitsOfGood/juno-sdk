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

const checkInput = (input: projectInputType) => {
  if (!input) {
    throw new Error(
      'The project input provided must include either the id or name and cannot be null!'
    );
  }
  if (!input.id && input.name.trim().length === 0) {
    throw new Error('The project input name cannot be empty!');
  } else if (!input.name && input.id.trim().length === 0) {
    throw new Error('The project input id cannot be empty!');
  }
};

export const projectAPI: ProjectAPI = {
  createProject: async function (
    projectName: string
  ): Promise<ProjectResponseType> {
    if (!projectName || projectName.trim().length === 0) {
      throw new Error(
        'The project name must be provided as an input and has to be nonempty!'
      );
    }

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
    checkInput(input);

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
    checkInput(input);
    if (
      !email ||
      email.trim().length === 0 ||
      !id ||
      id.toString().length === 0
    ) {
      throw new Error(
        'Please verify the email is non empty and the id is non empty!'
      );
    }

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
