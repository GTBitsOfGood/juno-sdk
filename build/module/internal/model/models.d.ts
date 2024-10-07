/// <reference types="node" />
/// <reference types="node" />
import localVarRequest from 'request';
export * from './createProjectModel';
export * from './createUserModel';
export * from './emailContent';
export * from './emailRecipient';
export * from './emailSender';
export * from './issueApiKeyRequest';
export * from './issueApiKeyResponse';
export * from './issueJWTResponse';
export * from './linkProjectModel';
export * from './linkUserModel';
export * from './projectResponse';
export * from './registerDomainModel';
export * from './registerDomainResponse';
export * from './registerEmailModel';
export * from './registerEmailResponse';
export * from './sendEmailModel';
export * from './sendEmailResponse';
export * from './sendGridDNSRecord';
export * from './sendGridDNSResponse';
export * from './setUserTypeModel';
export * from './setupEmailServiceModel';
export * from './userResponse';
export * from './verifyDomainModel';
import * as fs from 'fs';
export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    };
}
export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}
export declare class HttpBasicAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class HttpBearerAuth implements Authentication {
    accessToken: string | (() => string);
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class ApiKeyAuth implements Authentication {
    private location;
    private paramName;
    apiKey: string;
    constructor(location: string, paramName: string);
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class OAuth implements Authentication {
    accessToken: string;
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class VoidAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(_: localVarRequest.Options): void;
}
export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
