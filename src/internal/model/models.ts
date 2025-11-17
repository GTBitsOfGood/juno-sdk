import localVarRequest from 'request';

export * from './accessKey';
export * from './aggregateInterval';
export * from './analyticsConfigResponse';
export * from './clickEventProperties';
export * from './clickEventResponse';
export * from './createAnalyticsConfigModel';
export * from './createProjectModel';
export * from './createUserModel';
export * from './customEventResponse';
export * from './customEventTypeResponse';
export * from './customGraphType';
export * from './customGraphTypeResponse';
export * from './deleteFileBucketModel';
export * from './downloadFileModel';
export * from './downloadFileResponse';
export * from './emailConfigResponse';
export * from './emailContent';
export * from './emailDomain';
export * from './emailRecipient';
export * from './emailSender';
export * from './emailSenderSendEmailModel';
export * from './fileBucket';
export * from './fileConfigResponse';
export * from './fileProvider';
export * from './fileProviderPartial';
export * from './getAllClickEventsResponse';
export * from './getAllCustomEventTypeResponse';
export * from './getAllCustomEventsResponse';
export * from './getAllInputEventsResponse';
export * from './getAllVisitEventsResponse';
export * from './getClickEventsResponse';
export * from './getCustomEventsResponse';
export * from './getInputEventsResponse';
export * from './getVisitEventsResponse';
export * from './inputEventProperties';
export * from './inputEventResponse';
export * from './issueApiKeyRequest';
export * from './issueApiKeyResponse';
export * from './issueJWTResponse';
export * from './linkProjectModel';
export * from './linkUserModel';
export * from './logClickEventRequest';
export * from './logCustomEventRequest';
export * from './logInputEventRequest';
export * from './logVisitEventRequest';
export * from './modelFile';
export * from './projectResponse';
export * from './registerDomainModel';
export * from './registerDomainResponse';
export * from './registerEmailModel';
export * from './registerEmailResponse';
export * from './registerFileBucketModel';
export * from './registerFileProviderModel';
export * from './sendEmailModel';
export * from './sendEmailResponse';
export * from './sendEmailStatisticsResponse';
export * from './sendEmailStatisticsResponses';
export * from './sendGridDNSRecord';
export * from './sendGridDNSResponse';
export * from './setUserTypeModel';
export * from './setupEmailResponse';
export * from './setupEmailServiceModel';
export * from './setupFileServiceResponse';
export * from './unlinkProjectModel';
export * from './updateAnalyticsConfigModel';
export * from './uploadFileModel';
export * from './uploadFileResponse';
export * from './userResponse';
export * from './userResponses';
export * from './verifyDomainModel';
export * from './visitEventProperties';
export * from './visitEventResponse';

import * as fs from 'fs';

export interface RequestDetailedFile {
  value: Buffer;
  options?: {
    filename?: string;
    contentType?: string;
  };
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;

import { AccessKey } from './accessKey';
import { AggregateInterval } from './aggregateInterval';
import { AnalyticsConfigResponse } from './analyticsConfigResponse';
import { ClickEventProperties } from './clickEventProperties';
import { ClickEventResponse } from './clickEventResponse';
import { CreateAnalyticsConfigModel } from './createAnalyticsConfigModel';
import { CreateProjectModel } from './createProjectModel';
import { CreateUserModel } from './createUserModel';
import { CustomEventResponse } from './customEventResponse';
import { CustomEventTypeResponse } from './customEventTypeResponse';
import { CustomGraphType } from './customGraphType';
import { CustomGraphTypeResponse } from './customGraphTypeResponse';
import { DeleteFileBucketModel } from './deleteFileBucketModel';
import { DownloadFileModel } from './downloadFileModel';
import { DownloadFileResponse } from './downloadFileResponse';
import { EmailConfigResponse } from './emailConfigResponse';
import { EmailContent } from './emailContent';
import { EmailDomain } from './emailDomain';
import { EmailRecipient } from './emailRecipient';
import { EmailSender } from './emailSender';
import { EmailSenderSendEmailModel } from './emailSenderSendEmailModel';
import { FileBucket } from './fileBucket';
import { FileConfigResponse } from './fileConfigResponse';
import { FileProvider } from './fileProvider';
import { FileProviderPartial } from './fileProviderPartial';
import { GetAllClickEventsResponse } from './getAllClickEventsResponse';
import { GetAllCustomEventTypeResponse } from './getAllCustomEventTypeResponse';
import { GetAllCustomEventsResponse } from './getAllCustomEventsResponse';
import { GetAllInputEventsResponse } from './getAllInputEventsResponse';
import { GetAllVisitEventsResponse } from './getAllVisitEventsResponse';
import { GetClickEventsResponse } from './getClickEventsResponse';
import { GetCustomEventsResponse } from './getCustomEventsResponse';
import { GetInputEventsResponse } from './getInputEventsResponse';
import { GetVisitEventsResponse } from './getVisitEventsResponse';
import { InputEventProperties } from './inputEventProperties';
import { InputEventResponse } from './inputEventResponse';
import { IssueApiKeyRequest } from './issueApiKeyRequest';
import { IssueApiKeyResponse } from './issueApiKeyResponse';
import { IssueJWTResponse } from './issueJWTResponse';
import { LinkProjectModel } from './linkProjectModel';
import { LinkUserModel } from './linkUserModel';
import { LogClickEventRequest } from './logClickEventRequest';
import { LogCustomEventRequest } from './logCustomEventRequest';
import { LogInputEventRequest } from './logInputEventRequest';
import { LogVisitEventRequest } from './logVisitEventRequest';
import { ModelFile } from './modelFile';
import { ProjectResponse } from './projectResponse';
import { RegisterDomainModel } from './registerDomainModel';
import { RegisterDomainResponse } from './registerDomainResponse';
import { RegisterEmailModel } from './registerEmailModel';
import { RegisterEmailResponse } from './registerEmailResponse';
import { RegisterFileBucketModel } from './registerFileBucketModel';
import { RegisterFileProviderModel } from './registerFileProviderModel';
import { SendEmailModel } from './sendEmailModel';
import { SendEmailResponse } from './sendEmailResponse';
import { SendEmailStatisticsResponse } from './sendEmailStatisticsResponse';
import { SendEmailStatisticsResponses } from './sendEmailStatisticsResponses';
import { SendGridDNSRecord } from './sendGridDNSRecord';
import { SendGridDNSResponse } from './sendGridDNSResponse';
import { SetUserTypeModel } from './setUserTypeModel';
import { SetupEmailResponse } from './setupEmailResponse';
import { SetupEmailServiceModel } from './setupEmailServiceModel';
import { SetupFileServiceResponse } from './setupFileServiceResponse';
import { UnlinkProjectModel } from './unlinkProjectModel';
import { UpdateAnalyticsConfigModel } from './updateAnalyticsConfigModel';
import { UploadFileModel } from './uploadFileModel';
import { UploadFileResponse } from './uploadFileResponse';
import { UserResponse } from './userResponse';
import { UserResponses } from './userResponses';
import { VerifyDomainModel } from './verifyDomainModel';
import { VisitEventProperties } from './visitEventProperties';
import { VisitEventResponse } from './visitEventResponse';

/* tslint:disable:no-unused-variable */
let primitives = [
  'string',
  'boolean',
  'double',
  'integer',
  'long',
  'float',
  'number',
  'any',
];

let enumsMap: { [index: string]: any } = {
  AggregateInterval: AggregateInterval,
  'FileProvider.TypeEnum': FileProvider.TypeEnum,
  'RegisterFileProviderModel.TypeEnum': RegisterFileProviderModel.TypeEnum,
  'SetUserTypeModel.TypeEnum': SetUserTypeModel.TypeEnum,
  'UserResponse.TypeEnum': UserResponse.TypeEnum,
};

let typeMap: { [index: string]: any } = {
  AccessKey: AccessKey,
  AnalyticsConfigResponse: AnalyticsConfigResponse,
  ClickEventProperties: ClickEventProperties,
  ClickEventResponse: ClickEventResponse,
  CreateAnalyticsConfigModel: CreateAnalyticsConfigModel,
  CreateProjectModel: CreateProjectModel,
  CreateUserModel: CreateUserModel,
  CustomEventResponse: CustomEventResponse,
  CustomEventTypeResponse: CustomEventTypeResponse,
  CustomGraphType: CustomGraphType,
  CustomGraphTypeResponse: CustomGraphTypeResponse,
  DeleteFileBucketModel: DeleteFileBucketModel,
  DownloadFileModel: DownloadFileModel,
  DownloadFileResponse: DownloadFileResponse,
  EmailConfigResponse: EmailConfigResponse,
  EmailContent: EmailContent,
  EmailDomain: EmailDomain,
  EmailRecipient: EmailRecipient,
  EmailSender: EmailSender,
  EmailSenderSendEmailModel: EmailSenderSendEmailModel,
  FileBucket: FileBucket,
  FileConfigResponse: FileConfigResponse,
  FileProvider: FileProvider,
  FileProviderPartial: FileProviderPartial,
  GetAllClickEventsResponse: GetAllClickEventsResponse,
  GetAllCustomEventTypeResponse: GetAllCustomEventTypeResponse,
  GetAllCustomEventsResponse: GetAllCustomEventsResponse,
  GetAllInputEventsResponse: GetAllInputEventsResponse,
  GetAllVisitEventsResponse: GetAllVisitEventsResponse,
  GetClickEventsResponse: GetClickEventsResponse,
  GetCustomEventsResponse: GetCustomEventsResponse,
  GetInputEventsResponse: GetInputEventsResponse,
  GetVisitEventsResponse: GetVisitEventsResponse,
  InputEventProperties: InputEventProperties,
  InputEventResponse: InputEventResponse,
  IssueApiKeyRequest: IssueApiKeyRequest,
  IssueApiKeyResponse: IssueApiKeyResponse,
  IssueJWTResponse: IssueJWTResponse,
  LinkProjectModel: LinkProjectModel,
  LinkUserModel: LinkUserModel,
  LogClickEventRequest: LogClickEventRequest,
  LogCustomEventRequest: LogCustomEventRequest,
  LogInputEventRequest: LogInputEventRequest,
  LogVisitEventRequest: LogVisitEventRequest,
  ModelFile: ModelFile,
  ProjectResponse: ProjectResponse,
  RegisterDomainModel: RegisterDomainModel,
  RegisterDomainResponse: RegisterDomainResponse,
  RegisterEmailModel: RegisterEmailModel,
  RegisterEmailResponse: RegisterEmailResponse,
  RegisterFileBucketModel: RegisterFileBucketModel,
  RegisterFileProviderModel: RegisterFileProviderModel,
  SendEmailModel: SendEmailModel,
  SendEmailResponse: SendEmailResponse,
  SendEmailStatisticsResponse: SendEmailStatisticsResponse,
  SendEmailStatisticsResponses: SendEmailStatisticsResponses,
  SendGridDNSRecord: SendGridDNSRecord,
  SendGridDNSResponse: SendGridDNSResponse,
  SetUserTypeModel: SetUserTypeModel,
  SetupEmailResponse: SetupEmailResponse,
  SetupEmailServiceModel: SetupEmailServiceModel,
  SetupFileServiceResponse: SetupFileServiceResponse,
  UnlinkProjectModel: UnlinkProjectModel,
  UpdateAnalyticsConfigModel: UpdateAnalyticsConfigModel,
  UploadFileModel: UploadFileModel,
  UploadFileResponse: UploadFileResponse,
  UserResponse: UserResponse,
  UserResponses: UserResponses,
  VerifyDomainModel: VerifyDomainModel,
  VisitEventProperties: VisitEventProperties,
  VisitEventResponse: VisitEventResponse,
};

export class ObjectSerializer {
  public static findCorrectType(data: any, expectedType: string) {
    if (data == undefined) {
      return expectedType;
    } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
      return expectedType;
    } else if (expectedType === 'Date') {
      return expectedType;
    } else {
      if (enumsMap[expectedType]) {
        return expectedType;
      }

      if (!typeMap[expectedType]) {
        return expectedType; // w/e we don't know the type
      }

      // Check the discriminator
      let discriminatorProperty = typeMap[expectedType].discriminator;
      if (discriminatorProperty == null) {
        return expectedType; // the type does not have a discriminator. use it.
      } else {
        if (data[discriminatorProperty]) {
          var discriminatorType = data[discriminatorProperty];
          if (typeMap[discriminatorType]) {
            return discriminatorType; // use the type given in the discriminator
          } else {
            return expectedType; // discriminator did not map to a type
          }
        } else {
          return expectedType; // discriminator was not present (or an empty string)
        }
      }
    }
  }

  public static serialize(data: any, type: string) {
    if (data == undefined) {
      return data;
    } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
      return data;
    } else if (type.lastIndexOf('Array<', 0) === 0) {
      // string.startsWith pre es6
      let subType: string = type.replace('Array<', ''); // Array<Type> => Type>
      subType = subType.substring(0, subType.length - 1); // Type> => Type
      let transformedData: any[] = [];
      for (let index = 0; index < data.length; index++) {
        let datum = data[index];
        transformedData.push(ObjectSerializer.serialize(datum, subType));
      }
      return transformedData;
    } else if (type === 'Date') {
      return data.toISOString();
    } else {
      if (enumsMap[type]) {
        return data;
      }
      if (!typeMap[type]) {
        // in case we dont know the type
        return data;
      }

      // Get the actual type of this object
      type = this.findCorrectType(data, type);

      // get the map for the correct type.
      let attributeTypes = typeMap[type].getAttributeTypeMap();
      let instance: { [index: string]: any } = {};
      for (let index = 0; index < attributeTypes.length; index++) {
        let attributeType = attributeTypes[index];
        instance[attributeType.baseName] = ObjectSerializer.serialize(
          data[attributeType.name],
          attributeType.type
        );
      }
      return instance;
    }
  }

  public static deserialize(data: any, type: string) {
    // polymorphism may change the actual type.
    type = ObjectSerializer.findCorrectType(data, type);
    if (data == undefined) {
      return data;
    } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
      return data;
    } else if (type.lastIndexOf('Array<', 0) === 0) {
      // string.startsWith pre es6
      let subType: string = type.replace('Array<', ''); // Array<Type> => Type>
      subType = subType.substring(0, subType.length - 1); // Type> => Type
      let transformedData: any[] = [];
      for (let index = 0; index < data.length; index++) {
        let datum = data[index];
        transformedData.push(ObjectSerializer.deserialize(datum, subType));
      }
      return transformedData;
    } else if (type === 'Date') {
      return new Date(data);
    } else {
      if (enumsMap[type]) {
        // is Enum
        return data;
      }

      if (!typeMap[type]) {
        // dont know the type
        return data;
      }
      let instance = new typeMap[type]();
      let attributeTypes = typeMap[type].getAttributeTypeMap();
      for (let index = 0; index < attributeTypes.length; index++) {
        let attributeType = attributeTypes[index];
        instance[attributeType.name] = ObjectSerializer.deserialize(
          data[attributeType.baseName],
          attributeType.type
        );
      }
      return instance;
    }
  }
}

export interface Authentication {
  /**
   * Apply authentication settings to header and query params.
   */
  applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
  public username: string = '';
  public password: string = '';

  applyToRequest(requestOptions: localVarRequest.Options): void {
    requestOptions.auth = {
      username: this.username,
      password: this.password,
    };
  }
}

export class HttpBearerAuth implements Authentication {
  public accessToken: string | (() => string) = '';

  applyToRequest(requestOptions: localVarRequest.Options): void {
    if (requestOptions && requestOptions.headers) {
      const accessToken =
        typeof this.accessToken === 'function'
          ? this.accessToken()
          : this.accessToken;
      requestOptions.headers['Authorization'] = 'Bearer ' + accessToken;
    }
  }
}

export class ApiKeyAuth implements Authentication {
  public apiKey: string = '';

  constructor(private location: string, private paramName: string) {}

  applyToRequest(requestOptions: localVarRequest.Options): void {
    if (this.location == 'query') {
      (<any>requestOptions.qs)[this.paramName] = this.apiKey;
    } else if (
      this.location == 'header' &&
      requestOptions &&
      requestOptions.headers
    ) {
      requestOptions.headers[this.paramName] = this.apiKey;
    } else if (
      this.location == 'cookie' &&
      requestOptions &&
      requestOptions.headers
    ) {
      if (requestOptions.headers['Cookie']) {
        requestOptions.headers['Cookie'] +=
          '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
      } else {
        requestOptions.headers['Cookie'] =
          this.paramName + '=' + encodeURIComponent(this.apiKey);
      }
    }
  }
}

export class OAuth implements Authentication {
  public accessToken: string = '';

  applyToRequest(requestOptions: localVarRequest.Options): void {
    if (requestOptions && requestOptions.headers) {
      requestOptions.headers['Authorization'] = 'Bearer ' + this.accessToken;
    }
  }
}

export class VoidAuth implements Authentication {
  public username: string = '';
  public password: string = '';

  applyToRequest(_: localVarRequest.Options): void {
    // Do nothing
  }
}

export type Interceptor = (
  requestOptions: localVarRequest.Options
) => Promise<void> | void;
