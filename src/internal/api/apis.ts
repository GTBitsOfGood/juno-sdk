export * from './defaultApi';
import { DefaultApi } from './defaultApi';
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

export const APIS = [DefaultApi, EmailApi, ProjectApi, UserApi];
