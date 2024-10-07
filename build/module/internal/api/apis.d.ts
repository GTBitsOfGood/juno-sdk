/// <reference types="node" />
export * from './authApi';
import { AuthApi } from './authApi';
export * from './emailApi';
import { EmailApi } from './emailApi';
export * from './projectApi';
import { ProjectApi } from './projectApi';
export * from './userApi';
import { UserApi } from './userApi';
import * as http from 'http';
export declare class HttpError extends Error {
    response: http.IncomingMessage;
    body: any;
    statusCode?: number;
    constructor(response: http.IncomingMessage, body: any, statusCode?: number);
}
export { RequestFile } from '../model/models';
export declare const APIS: (typeof AuthApi | typeof EmailApi | typeof ProjectApi | typeof UserApi)[];
