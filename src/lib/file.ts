import {
  Configuration,
  DeleteFileBucketModel,
  DownloadFileModel,
  DownloadFileResponse,
  FileBucket,
  FileBucketApi,
  FileConfigApi,
  FileConfigResponse,
  FileDownloadApi,
  FileProvider,
  FileProviderApi,
  FileProviderPartial,
  FileUploadApi,
  RegisterFileBucketModel,
  RegisterFileProviderModel,
  SetupFileServiceResponse,
  UploadFileModel,
  UploadFileResponse,
} from '../internal/index';
import { ApiCredentials } from './apiCredentials';
import { JunoValidationError } from './errors';
import { validateString } from './validators';

export class FileAPI {
  private configApi: FileConfigApi;
  private uploadApi: FileUploadApi;
  private downloadApi: FileDownloadApi;
  private bucketApi: FileBucketApi;
  private providerApi: FileProviderApi;

  constructor(baseURL?: string, apiKey?: string) {
    const config = new Configuration({ basePath: baseURL, accessToken: apiKey });
    this.configApi = new FileConfigApi(config);
    this.uploadApi = new FileUploadApi(config);
    this.downloadApi = new FileDownloadApi(config);
    this.bucketApi = new FileBucketApi(config);
    this.providerApi = new FileProviderApi(config);
  }

  async setup(credentials?: ApiCredentials): Promise<SetupFileServiceResponse> {
    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }
    return await this.configApi.fileConfigControllerSetup(
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async getConfig(
    projectId: string,
    credentials?: ApiCredentials
  ): Promise<FileConfigResponse> {
    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.configApi.fileConfigControllerGetFileConfigByProjectId(
      { projectId },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async deleteConfig(
    projectId: string,
    credentials?: ApiCredentials
  ): Promise<FileConfigResponse> {
    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.configApi.fileConfigControllerDeleteFileConfigByProjectId(
      { projectId },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async registerProvider(
    options: {
      baseUrl: string;
      providerName: string;
      type: string;
      accessKey: { publicAccessKey: string; privateAccessKey: string };
    },
    credentials?: ApiCredentials
  ): Promise<FileProviderPartial> {
    const { baseUrl, providerName, type, accessKey } = options;

    validateString(baseUrl, 'baseUrl must be non-empty');
    validateString(providerName, 'providerName must be non-empty');
    validateString(
      accessKey?.publicAccessKey,
      'publicAccessKey must be non-empty'
    );
    validateString(
      accessKey?.privateAccessKey,
      'privateAccessKey must be non-empty'
    );

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    const model: RegisterFileProviderModel = {
      accessKey: accessKey as any,
      baseUrl,
      providerName,
      type,
    };

    return await this.providerApi.fileProviderControllerRegisterFileProvider(
      { registerFileProviderModel: model },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async deleteProvider(
    name: string,
    credentials?: ApiCredentials
  ): Promise<FileProviderPartial> {
    validateString(name, 'Provider name must be non-empty');
    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.providerApi.fileProviderControllerDeleteFileProvider(
      { name },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async getAllFileProviders(
    credentials?: ApiCredentials
  ): Promise<FileProvider[]> {
    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.providerApi.fileProviderControllerGetAllFileProviders(
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async registerBucket(
    options: {
      name: string;
      configId: number;
      fileProviderName: string;
      fileServiceFile?: Array<object>;
    },
    credentials?: ApiCredentials
  ): Promise<FileBucket> {
    const { name, configId, fileProviderName, fileServiceFile } = options;

    validateString(name, 'Bucket name must be non-empty');
    if (typeof configId !== 'number') {
      throw new JunoValidationError('configId must be a number');
    }
    validateString(fileProviderName, 'fileProviderName must be non-empty');

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    const model: RegisterFileBucketModel = {
      name,
      configId,
      fileProviderName,
      fileServiceFile: fileServiceFile ?? [],
    };

    return await this.bucketApi.fileBucketControllerRegisterFileBucket(
      { registerFileBucketModel: model },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async deleteBucket(
    options: DeleteFileBucketModel,
    credentials?: ApiCredentials
  ): Promise<FileBucket> {
    const { name, configId, fileProviderName } = options;
    validateString(name, 'Bucket name must be non-empty');
    if (typeof configId !== 'number') {
      throw new JunoValidationError('configId must be a number');
    }
    validateString(fileProviderName, 'fileProviderName must be non-empty');

    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.bucketApi.fileBucketControllerDeleteFileBucket(
      { deleteFileBucketModel: options },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async getBucketsByConfigIdAndEnv(
    configId: string,
    credentials?: ApiCredentials
  ): Promise<FileBucket[]> {
    const headers: Record<string, string> = {};
    if (credentials?.userJwt) {
      headers['X-User-JWT'] = credentials.userJwt;
    }
    if (credentials?.projectId !== undefined) {
      headers['X-Project-Id'] = String(credentials.projectId);
    }

    return await this.bucketApi.fileBucketControllerGetBucketsByConfigIdAndEnv(
      { configId },
      async ({ init }) => ({ headers: { ...(init.headers as Record<string, string>), ...headers } })
    );
  }

  async uploadFile(options: {
    fileName: string;
    bucketName: string;
    providerName: string;
    configId: number;
    region?: string;
  }): Promise<UploadFileResponse> {
    const { fileName, bucketName, providerName, configId, region } = options;

    validateString(fileName, 'fileName must be non-empty');
    validateString(bucketName, 'bucketName must be non-empty');
    validateString(providerName, 'providerName must be non-empty');
    if (typeof configId !== 'number') {
      throw new JunoValidationError('configId must be a number');
    }
    if (region) validateString(region, 'region must be non-empty');

    const model: UploadFileModel = {
      fileName,
      bucketName,
      providerName,
      configId,
      region: region ?? undefined,
    };

    return await this.uploadApi.fileUploadControllerUploadFile({ uploadFileModel: model });
  }

  async downloadFile(options: {
    bucketName: string;
    configId: number;
    fileName: string;
    providerName: string;
    region?: string;
  }): Promise<DownloadFileResponse> {
    const { bucketName, configId, fileName, providerName, region } = options;

    validateString(bucketName, 'bucketName must be non-empty');
    if (typeof configId !== 'number') {
      throw new JunoValidationError('configId must be a number');
    }
    validateString(fileName, 'fileName must be non-empty');
    validateString(providerName, 'providerName must be non-empty');
    if (region) validateString(region, 'region must be non-empty');

    const model: DownloadFileModel = {
      bucketName,
      configId,
      fileName,
      providerName,
      region: region ?? undefined,
    };

    return await this.downloadApi.fileDownloadControllerDownloadFile({ downloadFileModel: model });
  }
}
