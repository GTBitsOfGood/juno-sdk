import {
    DefaultApi,
    IssueApiKeyResponse,
    IssueApiKeyRequest
} from '../internal/api';

export type AuthAPI = {
    createKey: (
        email: string,
        password: string,
        description: string,
        environment: string,
        options: { headers: { [name: string]: string } }
    ) => Promise<IssueApiKeyResponse>;
    revokeKey: (
        authorization: string,
        options: { headers: { [name: string]: string } }
    ) => Promise<any>;
    createJWT: (
        authorization: string,
        options: { headers: { [name: string]: string } }
    ) => Promise<IssueApiKeyResponse>;
};

const authApiInternal = new DefaultApi();

export const authAPI: AuthAPI = {
    createKey: async function (email: string, password: string, environment: string, description: string = "",
        options: { headers: { [name: string]: string } } = { headers: {} }
    ): Promise<IssueApiKeyResponse> {
        if (!email || email.trim().length === 0) {
            throw new Error('The email must be nonempty');
        }
        if (!password || password.trim().length === 0) {
            throw new Error('The password for the user must be nonempty');
        }
        if (!environment || environment.trim().length === 0) {
            throw new Error('The environment for the user must be nonempty');
        }
        email = email.trim()
        password = password.trim()
        environment = environment.trim()
        description = description.trim()
        try {
            const issueApiKeyRequest: IssueApiKeyRequest = { email, password, description, environment };
            const result = await authApiInternal.authControllerCreateApiKey(issueApiKeyRequest,
                options
            );
            return result.body;
        } catch (e) {
            throw e;
        }
    },
    revokeKey: async function (authorization: string, options: { headers: { [name: string]: string } } = { headers: {} }
    ): Promise<any> {
        if (!authorization || authorization.trim().length === 0) {
            throw new Error('The authorization token must be nonempty');
        }
        authorization = authorization.trim()
        try {
            const result = await authApiInternal.authControllerDeleteApiKey(
                authorization, options
            );
            return result.body;
        } catch (e) {
            throw e;
        }
    },
    createJWT: async function (authorization: string, options: { headers: { [name: string]: string } } = { headers: {} }
    ): Promise<IssueApiKeyResponse> {
        if (!authorization || authorization.trim().length === 0) {
            throw new Error('The authorization token must be nonempty');
        }
        authorization = authorization.trim()
        try {
            const result = await authApiInternal.authControllerGetJWT(
                authorization, options
            );
            return result.body;
        } catch (e) {
            throw e;
        }
    }
};