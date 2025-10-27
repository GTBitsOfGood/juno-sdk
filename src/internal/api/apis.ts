export * from './analyticsApi';
export * from './analyticsConfigApi';
export * from './authApi';
export * from './emailApi';
export * from './fileBucketApi';
export * from './fileConfigApi';
export * from './fileDownloadApi';
export * from './fileProviderApi';
export * from './fileUploadApi';
export * from './projectApi';
export * from './userApi';
import * as http from 'http';
import { AnalyticsApi } from './analyticsApi';
import { AnalyticsConfigApi } from './analyticsConfigApi';
import { AuthApi } from './authApi';
import { EmailApi } from './emailApi';
import { FileBucketApi } from './fileBucketApi';
import { FileConfigApi } from './fileConfigApi';
import { FileDownloadApi } from './fileDownloadApi';
import { FileProviderApi } from './fileProviderApi';
import { FileUploadApi } from './fileUploadApi';
import { ProjectApi } from './projectApi';
import { UserApi } from './userApi';

export class HttpError extends Error {
  constructor(
    public response: http.IncomingMessage,
    public body: any,
    public statusCode?: number
  ) {
    super('HTTP request failed');
    this.name = 'HttpError';
  }
}

export { RequestFile } from '../model/models';

export const APIS = [
  AnalyticsApi,
  AnalyticsConfigApi,
  AuthApi,
  EmailApi,
  FileBucketApi,
  FileConfigApi,
  FileDownloadApi,
  FileProviderApi,
  FileUploadApi,
  ProjectApi,
  UserApi,
];
