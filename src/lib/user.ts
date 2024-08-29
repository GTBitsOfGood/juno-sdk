type UserAPI = {
  getUser: () => void;
  createUser: () => void;
  linkToProject: () => void;
  setUserType: () => void;
};

export const userAPI: UserAPI = {
  createUser: function (): void {
    throw new Error('Function not implemented.');
  },
  linkToProject: function (): void {
    throw new Error('Function not implemented.');
  },
  setUserType: function (): void {
    throw new Error('Function not implemented.');
  },
  getUser: function (): void {
    throw new Error('Function not implemented.');
  },
};
