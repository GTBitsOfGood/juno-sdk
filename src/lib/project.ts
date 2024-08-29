type ProjectAPI = {
  createProject: () => void;
  // Shou;d be by ID or Name
  getProject: () => void;
  // Shou;d be by ID or Name
  linkProjectToUser: () => void;
};

export const projectAPI: ProjectAPI = {
  createProject: function (): void {
    throw new Error('Function not implemented.');
  },
  getProject: function (): void {
    throw new Error('Function not implemented.');
  },
  linkProjectToUser: function (): void {
    throw new Error('Function not implemented.');
  },
};
