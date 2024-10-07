export * from './authApi';
import { AuthApi } from './authApi';
export * from './emailApi';
import { EmailApi } from './emailApi';
export * from './projectApi';
import { ProjectApi } from './projectApi';
export * from './userApi';
import { UserApi } from './userApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [AuthApi, EmailApi, ProjectApi, UserApi];
