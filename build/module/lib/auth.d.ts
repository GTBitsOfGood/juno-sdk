import { IssueApiKeyResponse, IssueJWTResponse } from '../internal/api';
export declare class AuthAPI {
    private internalApi;
    private apiKey?;
    constructor(baseURL?: string, apiKey?: string);
    get junoApiKey(): string;
    createKey(options: {
        email: string;
        password: string;
        project: string;
        environment: string;
        description: string | undefined;
    }): Promise<IssueApiKeyResponse>;
    revokeKey(options: {
        apiKey: string;
    }): Promise<any>;
    createJWT(): Promise<IssueJWTResponse>;
}
