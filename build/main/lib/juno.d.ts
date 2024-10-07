import { EmailAPI } from './email';
import { ProjectAPI } from './project';
import { UserAPI } from './user';
declare class JunoAPI {
    private apiKey?;
    private userAPI?;
    private emailAPI?;
    private projectAPI?;
    private authAPI?;
    get user(): UserAPI;
    get email(): EmailAPI;
    get project(): ProjectAPI;
    init(options: {
        apiKey: string;
        baseURL?: string;
    }): void;
}
export declare const juno: JunoAPI;
export {};
