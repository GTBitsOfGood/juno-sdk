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

export class ProjectAPI {
  private internalApi: ProjectApi;
  constructor(baseURL?: string, apiKey?: string) {
    this.internalApi = new ProjectApi(baseURL);
    this.internalApi.accessToken = apiKey;
  }
  async createProject(options: {
    projectName: string;
    superadminEmail: string;
    superadminPassword: string;
  }): Promise<ProjectResponse> {
    const { projectName, superadminEmail, superadminPassword } = options;
    if (!projectName || projectName.trim().length === 0) {
      throw new Error(
        'The project name must be provided as an input and has to be nonempty!'
      );
    }

    try {
      const createProjectModel = new CreateProjectModel();
      createProjectModel.name = projectName;

      const res = await this.internalApi.projectControllerCreateProject(
        superadminPassword,
        superadminEmail,
        createProjectModel
      );
      return res.body;
    } catch (e) {
      throw new Error(e);
    }
  }
  // Should be by ID or Name
  async getProject(input: projectInputType): Promise<ProjectResponse> {
    checkInput(input);

    try {
      const res = input.id
        ? await this.internalApi.projectControllerGetProjectById(`${input.id}`)
        : await this.internalApi.projectControllerGetProjectByName(input.name);
      return res.body;
    } catch (e) {
      throw new Error(e);
    }
  }
  // Should be by ID or Name
  async linkProjectToUser(options: {
    input: projectInputType;
    email: string | undefined;
    id: number | undefined;
  }): Promise<ProjectResponse> {
    const { input, email, id } = options;
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
        ? await this.internalApi.projectControllerLinkUserWithProjectId(
            input.id,
            linkUserModel
          )
        : await this.internalApi.projectControllerLinkUserWithProjectName(
            input.name,
            linkUserModel
          );
      return res.body;
    } catch (e) {
      throw new Error(e);
    }
  }
}

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
