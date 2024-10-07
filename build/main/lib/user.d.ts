import { UserResponse } from '../internal/api';
export declare class UserAPI {
    private internalApi;
    constructor(baseURL?: string);
    createUser(options: {
        email: string;
        name: string;
        password: string;
        adminEmail: string;
        adminPassword: string;
    }): Promise<UserResponse>;
    linkToProject(options: {
        userId: string;
        projectId: number;
        projectName: string;
        email: string;
        password: string;
    }): Promise<UserResponse>;
    setUserType(options: {
        email: string;
        type: number;
        adminEmail: string;
        adminPassword: string;
    }): Promise<UserResponse>;
    getUser(id: string): Promise<UserResponse>;
}
