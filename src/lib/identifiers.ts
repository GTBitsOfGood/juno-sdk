// syntax error if name and both id are provided, only either or can be provided
export type ProjectIdentifier =
  | {
      name: string;
      id?: never;
    }
  | {
      id: number;
      name?: never;
    };

export type UserIdentifier =
  | {
      email: string;
      id?: never;
    }
  | {
      id: number;
      email?: never;
    };
