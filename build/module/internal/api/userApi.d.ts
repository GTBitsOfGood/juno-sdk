/**
 * Juno
 * Juno Public API Docs
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/// <reference types="node" />
import http from 'http';
import { CreateUserModel } from '../model/createUserModel';
import { LinkProjectModel } from '../model/linkProjectModel';
import { SetUserTypeModel } from '../model/setUserTypeModel';
import { UserResponse } from '../model/userResponse';
import { Authentication, Interceptor } from '../model/models';
import { HttpBearerAuth } from '../model/models';
export declare enum UserApiApiKeys {
}
export declare class UserApi {
    protected _basePath: string;
    protected _defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        default: Authentication;
        API_Key: HttpBearerAuth;
    };
    protected interceptors: Interceptor[];
    constructor(basePath?: string);
    set useQuerystring(value: boolean);
    set basePath(basePath: string);
    set defaultHeaders(defaultHeaders: any);
    get defaultHeaders(): any;
    get basePath(): string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: UserApiApiKeys, value: string): void;
    set accessToken(accessToken: string | (() => string));
    addInterceptor(interceptor: Interceptor): void;
    /**
     *
     * @summary Create a new user.
     * @param xUserPassword Password of the admin or superadmin user
     * @param xUserEmail Email of an admin or superadmin user
     * @param createUserModel The user details
     */
    userControllerCreateUser(xUserPassword: string, xUserEmail: string, createUserModel: CreateUserModel, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: UserResponse;
    }>;
    /**
     *
     * @summary Retrieve an existing user.
     * @param id The unique identifier of the user
     */
    userControllerGetUserById(id: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: UserResponse;
    }>;
    /**
     * Associates a user with a project ID.
     * @summary Link user to project.
     * @param id User ID being linked to a project
     * @param xUserPassword Password of the admin or superadmin user
     * @param xUserEmail Email of an admin or superadmin user
     * @param linkProjectModel Project details to link with the user
     */
    userControllerLinkUserWithProjectId(id: string, xUserPassword: string, xUserEmail: string, linkProjectModel: LinkProjectModel, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    /**
     * Updates the user type for an existing user. User type can be thought of as a role with role-based permissions, e.g. SUPERADMIN could have permissions an ADMIN would not. Only SUPERADMIN users can set types
     * @summary Update user type.
     * @param xUserPassword Password of the admin or superadmin user
     * @param xUserEmail Email of an admin or superadmin user
     * @param setUserTypeModel User ID, email, and the new type to be set
     */
    userControllerSetUserType(xUserPassword: string, xUserEmail: string, setUserTypeModel: SetUserTypeModel, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: UserResponse;
    }>;
}
