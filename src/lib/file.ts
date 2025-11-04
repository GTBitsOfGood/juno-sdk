import {
  DownloadFileModel,
  DownloadFileResponse,
  FileBucket,
  FileBucketApi,
  FileConfigApi,
  FileConfigResponse,
  FileDownloadApi,
  FileProviderApi,
  FileProviderResponse,
  RegisterFileBucketModel,
  RegisterFileProviderModel,
  SetupFileServiceResponse,
  FileUploadApi,
  UploadFileModel,
  UploadFileResponse,
} from '../internal/api';
import { JunoValidationError } from './errors';
import { validateString } from './validators';

export class FileAPI {
  private configApi: FileConfigApi;
  private uploadApi: FileUploadApi;
  private downloadApi: FileDownloadApi;
  private bucketApi: FileBucketApi;
  private providerApi: FileProviderApi;

  constructor(baseURL?: string, apiKey?: string) {
    this.configApi = new FileConfigApi(baseURL);
    this.uploadApi = new FileUploadApi(baseURL);
    this.downloadApi = new FileDownloadApi(baseURL);
    this.bucketApi = new FileBucketApi(baseURL);
    this.providerApi = new FileProviderApi(baseURL);

    this.configApi.accessToken = apiKey;
    this.uploadApi.accessToken = apiKey;
    this.downloadApi.accessToken = apiKey;
    this.bucketApi.accessToken = apiKey;
    this.providerApi.accessToken = apiKey;
  }

  async setup(): Promise<SetupFileServiceResponse> {
    const res = await this.configApi.fileConfigControllerSetup();
    return res.body;
  }

  async getConfigByProjectId(projectId: string): Promise<FileConfigResponse> {
    validateString(projectId, 'Project ID must be non-empty');
    const res =
      await this.configApi.fileConfigControllerGetFileConfigByProjectId(
        projectId
      );
    return res.body;
  }

  async registerProvider(options: {
    baseUrl: string;
    providerName: string;
    type: RegisterFileProviderModel.TypeEnum;
    accessKey: { accessKeyId: string; secretAccessKey: string };
  }): Promise<FileProviderResponse> {
    const { baseUrl, providerName, type, accessKey } = options;

    validateString(baseUrl, 'baseUrl must be non-empty');
    validateString(providerName, 'providerName must be non-empty');
    validateString(accessKey?.accessKeyId, 'accessKeyId must be non-empty');
    validateString(
      accessKey?.secretAccessKey,
      'secretAccessKey must be non-empty'
    );

    const model = new RegisterFileProviderModel();
    (model as any).accessKey = accessKey as any;
    model.baseUrl = baseUrl;
    model.providerName = providerName;
    model.type = type;

    const res =
      await this.providerApi.fileProviderControllerRegisterFileProvider(model);
    return res.body;
  }

  async registerBucket(options: {
    name: string;
    configId: number;
    fileProviderName: string;
    fileServiceFile?: Array<object>;
  }): Promise<FileBucket> {
    const { name, configId, fileProviderName, fileServiceFile } = options;

    validateString(name, 'Bucket name must be non-empty');
    if (typeof configId !== 'number') {
      throw new JunoValidationError('configId must be a number');
    }
    validateString(fileProviderName, 'fileProviderName must be non-empty');

    const model = new RegisterFileBucketModel();
    model.name = name;
    model.configId = configId;
    model.fileProviderName = fileProviderName;
    model.fileServiceFile = fileServiceFile ?? [];

    const res = await this.bucketApi.fileBucketControllerRegisterFileBucket(
      model
    );
    return res.body;
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

    const model = new UploadFileModel();
    model.fileName = fileName;
    model.bucketName = bucketName;
    model.providerName = providerName;
    model.configId = configId;
    if (region) model.region = region;

    const res = await this.uploadApi.fileUploadControllerUploadFile(model);
    return res.body;
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

    const model = new DownloadFileModel();
    model.bucketName = bucketName;
    model.configId = configId;
    model.fileName = fileName;
    model.providerName = providerName;
    if (region) model.region = region;

    const res = await this.downloadApi.fileDownloadControllerDownloadFile(
      model
    );
    return res.body;
  }
}
