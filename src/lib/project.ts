import {
  CreateProjectModel,
  LinkUserModel,
  ProjectApi,
  ProjectResponse,
} from '../internal/api';

// syntax error if name and both id are provided, only either or can be provided
type projectInputType =
  | {
      name: string;
      id?: never;
    }
  | {
      id: number;
      name?: never;
    };

type ProjectAPI = {
  createProject: (projectName: string) => Promise<ProjectResponse>;
  // Should be by ID or Name
  getProject: (input: projectInputType) => Promise<ProjectResponse>;
  // Should be by ID or Name
  linkProjectToUser: (
    input: projectInputType,
    email: string,
    id: number
  ) => Promise<ProjectResponse>;
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
  } else if (!input.name && !input.id) {
    throw new Error('The project input id cannot be empty!');
  }
};

export const projectAPI: ProjectAPI = {
  createProject: async function (
    projectName: string
  ): Promise<ProjectResponse> {
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
      return res.body;
    } catch (e) {
      throw new Error(e);
    }
  },

  getProject: async function (
    input: projectInputType
  ): Promise<ProjectResponse> {
    checkInput(input);

    try {
      const res = input.id
        ? await projectApi.projectControllerGetProjectById(`${input.id}`)
        : await projectApi.projectControllerGetProjectByName(input.name);
      return res.body;
    } catch (e) {
      throw new Error(e);
    }
  },

  linkProjectToUser: async function (
    input: projectInputType,
    email: string,
    id: number
  ): Promise<ProjectResponse> {
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
      return res.body;
    } catch (e) {
      throw new Error(e);
    }
  },
};
