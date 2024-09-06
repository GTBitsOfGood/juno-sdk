import { ProjectApi } from "../internal/api";

type projectInputType = {
  name: string;
  id?: never;
} | {
  id: string;
  name?: never;
};

type ProjectAPI = {
  createProject: () => void;
  // Shou;d be by ID or Name
  getProject: (input: projectInputType) => void;
  // Shou;d be by ID or Name
  linkProjectToUser: (input: projectInputType) => void;
};

const projectApi = new ProjectApi();

export const projectAPI: ProjectAPI = {
  createProject: function (): void {
    throw new Error('Function not implemented.');
  },

  getProject: function (input: projectInputType): Promise<any> {
    if (!input.id) {
      return projectApi.projectControllerGetProjectByName(input.name)
    } 
      return projectApi.projectControllerGetProjectById(input.id)
  },

  linkProjectToUser: function (input: projectInputType): void {
    throw new Error('Function not implemented.');
  },
};
