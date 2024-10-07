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
import { CreateProjectModel } from './createProjectModel';
import { CreateUserModel } from './createUserModel';
import { EmailContent } from './emailContent';
import { EmailRecipient } from './emailRecipient';
import { EmailSender } from './emailSender';
import { IssueApiKeyRequest } from './issueApiKeyRequest';
import { IssueApiKeyResponse } from './issueApiKeyResponse';
import { IssueJWTResponse } from './issueJWTResponse';
import { LinkProjectModel } from './linkProjectModel';
import { LinkUserModel } from './linkUserModel';
import { ProjectResponse } from './projectResponse';
import { RegisterDomainModel } from './registerDomainModel';
import { RegisterDomainResponse } from './registerDomainResponse';
import { RegisterEmailModel } from './registerEmailModel';
import { RegisterEmailResponse } from './registerEmailResponse';
import { SendEmailModel } from './sendEmailModel';
import { SendEmailResponse } from './sendEmailResponse';
import { SendGridDNSRecord } from './sendGridDNSRecord';
import { SendGridDNSResponse } from './sendGridDNSResponse';
import { SetUserTypeModel } from './setUserTypeModel';
import { SetupEmailServiceModel } from './setupEmailServiceModel';
import { UserResponse } from './userResponse';
import { VerifyDomainModel } from './verifyDomainModel';
/* tslint:disable:no-unused-variable */
let primitives = [
    "string",
    "boolean",
    "double",
    "integer",
    "long",
    "float",
    "number",
    "any"
];
let enumsMap = {
    "SetUserTypeModel.TypeEnum": SetUserTypeModel.TypeEnum,
    "UserResponse.TypeEnum": UserResponse.TypeEnum,
};
let typeMap = {
    "CreateProjectModel": CreateProjectModel,
    "CreateUserModel": CreateUserModel,
    "EmailContent": EmailContent,
    "EmailRecipient": EmailRecipient,
    "EmailSender": EmailSender,
    "IssueApiKeyRequest": IssueApiKeyRequest,
    "IssueApiKeyResponse": IssueApiKeyResponse,
    "IssueJWTResponse": IssueJWTResponse,
    "LinkProjectModel": LinkProjectModel,
    "LinkUserModel": LinkUserModel,
    "ProjectResponse": ProjectResponse,
    "RegisterDomainModel": RegisterDomainModel,
    "RegisterDomainResponse": RegisterDomainResponse,
    "RegisterEmailModel": RegisterEmailModel,
    "RegisterEmailResponse": RegisterEmailResponse,
    "SendEmailModel": SendEmailModel,
    "SendEmailResponse": SendEmailResponse,
    "SendGridDNSRecord": SendGridDNSRecord,
    "SendGridDNSResponse": SendGridDNSResponse,
    "SetUserTypeModel": SetUserTypeModel,
    "SetupEmailServiceModel": SetupEmailServiceModel,
    "UserResponse": UserResponse,
    "VerifyDomainModel": VerifyDomainModel,
};
export class ObjectSerializer {
    static findCorrectType(data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === "Date") {
            return expectedType;
        }
        else {
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
            }
            else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if (typeMap[discriminatorType]) {
                        return discriminatorType; // use the type given in the discriminator
                    }
                    else {
                        return expectedType; // discriminator did not map to a type
                    }
                }
                else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }
    static serialize(data, type) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.serialize(datum, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return data.toISOString();
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }
            // Get the actual type of this object
            type = this.findCorrectType(data, type);
            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance = {};
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }
    static deserialize(data, type) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.deserialize(datum, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return new Date(data);
        }
        else {
            if (enumsMap[type]) { // is Enum
                return data;
            }
            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}
export class HttpBasicAuth {
    username = '';
    password = '';
    applyToRequest(requestOptions) {
        requestOptions.auth = {
            username: this.username, password: this.password
        };
    }
}
export class HttpBearerAuth {
    accessToken = '';
    applyToRequest(requestOptions) {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                ? this.accessToken()
                : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}
export class ApiKeyAuth {
    location;
    paramName;
    apiKey = '';
    constructor(location, paramName) {
        this.location = location;
        this.paramName = paramName;
    }
    applyToRequest(requestOptions) {
        if (this.location == "query") {
            requestOptions.qs[this.paramName] = this.apiKey;
        }
        else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
        else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}
export class OAuth {
    accessToken = '';
    applyToRequest(requestOptions) {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}
export class VoidAuth {
    username = '';
    password = '';
    applyToRequest(_) {
        // Do nothing
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ludGVybmFsL21vZGVsL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMsbUJBQW1CLENBQUM7QUFDbEMsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGtCQUFrQixDQUFDO0FBQ2pDLGNBQWMsZUFBZSxDQUFDO0FBQzlCLGNBQWMsc0JBQXNCLENBQUM7QUFDckMsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMsb0JBQW9CLENBQUM7QUFDbkMsY0FBYyxpQkFBaUIsQ0FBQztBQUNoQyxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMsdUJBQXVCLENBQUM7QUFDdEMsY0FBYywwQkFBMEIsQ0FBQztBQUN6QyxjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMseUJBQXlCLENBQUM7QUFDeEMsY0FBYyxrQkFBa0IsQ0FBQztBQUNqQyxjQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGNBQWMscUJBQXFCLENBQUM7QUFDcEMsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMsMEJBQTBCLENBQUM7QUFDekMsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLHFCQUFxQixDQUFDO0FBZXBDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0s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