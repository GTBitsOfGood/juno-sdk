import { ProjectResponse } from '../internal/api';
type projectInputType = {
    name: string;
    id?: never;
} | {
    id: number;
    name?: never;
};
export declare class ProjectAPI {
    private internalApi;
    constructor(baseURL?: string);
    createProject(options: {
        projectName: string;
        superadminEmail: string;
        superadminPassword: string;
    }): Promise<ProjectResponse>;
    getProject(input: projectInputType): Promise<ProjectResponse>;
    linkProjectToUser(options: {
        input: projectInputType;
        email: string | undefined;
        id: number | undefined;
    }): Promise<ProjectResponse>;
}
export {};
