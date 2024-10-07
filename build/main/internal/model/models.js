"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidAuth = exports.OAuth = exports.ApiKeyAuth = exports.HttpBearerAuth = exports.HttpBasicAuth = exports.ObjectSerializer = void 0;
__exportStar(require("./createProjectModel"), exports);
__exportStar(require("./createUserModel"), exports);
__exportStar(require("./emailContent"), exports);
__exportStar(require("./emailRecipient"), exports);
__exportStar(require("./emailSender"), exports);
__exportStar(require("./issueApiKeyRequest"), exports);
__exportStar(require("./issueApiKeyResponse"), exports);
__exportStar(require("./issueJWTResponse"), exports);
__exportStar(require("./linkProjectModel"), exports);
__exportStar(require("./linkUserModel"), exports);
__exportStar(require("./projectResponse"), exports);
__exportStar(require("./registerDomainModel"), exports);
__exportStar(require("./registerDomainResponse"), exports);
__exportStar(require("./registerEmailModel"), exports);
__exportStar(require("./registerEmailResponse"), exports);
__exportStar(require("./sendEmailModel"), exports);
__exportStar(require("./sendEmailResponse"), exports);
__exportStar(require("./sendGridDNSRecord"), exports);
__exportStar(require("./sendGridDNSResponse"), exports);
__exportStar(require("./setUserTypeModel"), exports);
__exportStar(require("./setupEmailServiceModel"), exports);
__exportStar(require("./userResponse"), exports);
__exportStar(require("./verifyDomainModel"), exports);
const createProjectModel_1 = require("./createProjectModel");
const createUserModel_1 = require("./createUserModel");
const emailContent_1 = require("./emailContent");
const emailRecipient_1 = require("./emailRecipient");
const emailSender_1 = require("./emailSender");
const issueApiKeyRequest_1 = require("./issueApiKeyRequest");
const issueApiKeyResponse_1 = require("./issueApiKeyResponse");
const issueJWTResponse_1 = require("./issueJWTResponse");
const linkProjectModel_1 = require("./linkProjectModel");
const linkUserModel_1 = require("./linkUserModel");
const projectResponse_1 = require("./projectResponse");
const registerDomainModel_1 = require("./registerDomainModel");
const registerDomainResponse_1 = require("./registerDomainResponse");
const registerEmailModel_1 = require("./registerEmailModel");
const registerEmailResponse_1 = require("./registerEmailResponse");
const sendEmailModel_1 = require("./sendEmailModel");
const sendEmailResponse_1 = require("./sendEmailResponse");
const sendGridDNSRecord_1 = require("./sendGridDNSRecord");
const sendGridDNSResponse_1 = require("./sendGridDNSResponse");
const setUserTypeModel_1 = require("./setUserTypeModel");
const setupEmailServiceModel_1 = require("./setupEmailServiceModel");
const userResponse_1 = require("./userResponse");
const verifyDomainModel_1 = require("./verifyDomainModel");
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
    "SetUserTypeModel.TypeEnum": setUserTypeModel_1.SetUserTypeModel.TypeEnum,
    "UserResponse.TypeEnum": userResponse_1.UserResponse.TypeEnum,
};
let typeMap = {
    "CreateProjectModel": createProjectModel_1.CreateProjectModel,
    "CreateUserModel": createUserModel_1.CreateUserModel,
    "EmailContent": emailContent_1.EmailContent,
    "EmailRecipient": emailRecipient_1.EmailRecipient,
    "EmailSender": emailSender_1.EmailSender,
    "IssueApiKeyRequest": issueApiKeyRequest_1.IssueApiKeyRequest,
    "IssueApiKeyResponse": issueApiKeyResponse_1.IssueApiKeyResponse,
    "IssueJWTResponse": issueJWTResponse_1.IssueJWTResponse,
    "LinkProjectModel": linkProjectModel_1.LinkProjectModel,
    "LinkUserModel": linkUserModel_1.LinkUserModel,
    "ProjectResponse": projectResponse_1.ProjectResponse,
    "RegisterDomainModel": registerDomainModel_1.RegisterDomainModel,
    "RegisterDomainResponse": registerDomainResponse_1.RegisterDomainResponse,
    "RegisterEmailModel": registerEmailModel_1.RegisterEmailModel,
    "RegisterEmailResponse": registerEmailResponse_1.RegisterEmailResponse,
    "SendEmailModel": sendEmailModel_1.SendEmailModel,
    "SendEmailResponse": sendEmailResponse_1.SendEmailResponse,
    "SendGridDNSRecord": sendGridDNSRecord_1.SendGridDNSRecord,
    "SendGridDNSResponse": sendGridDNSResponse_1.SendGridDNSResponse,
    "SetUserTypeModel": setUserTypeModel_1.SetUserTypeModel,
    "SetupEmailServiceModel": setupEmailServiceModel_1.SetupEmailServiceModel,
    "UserResponse": userResponse_1.UserResponse,
    "VerifyDomainModel": verifyDomainModel_1.VerifyDomainModel,
};
class ObjectSerializer {
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
exports.ObjectSerializer = ObjectSerializer;
class HttpBasicAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(requestOptions) {
        requestOptions.auth = {
            username: this.username, password: this.password
        };
    }
}
exports.HttpBasicAuth = HttpBasicAuth;
class HttpBearerAuth {
    constructor() {
        this.accessToken = '';
    }
    applyToRequest(requestOptions) {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                ? this.accessToken()
                : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}
exports.HttpBearerAuth = HttpBearerAuth;
class ApiKeyAuth {
    constructor(location, paramName) {
        this.location = location;
        this.paramName = paramName;
        this.apiKey = '';
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
exports.ApiKeyAuth = ApiKeyAuth;
class OAuth {
    constructor() {
        this.accessToken = '';
    }
    applyToRequest(requestOptions) {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}
exports.OAuth = OAuth;
class VoidAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(_) {
        // Do nothing
    }
}
exports.VoidAuth = VoidAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ludGVybmFsL21vZGVsL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHVEQUFxQztBQUNyQyxvREFBa0M7QUFDbEMsaURBQStCO0FBQy9CLG1EQUFpQztBQUNqQyxnREFBOEI7QUFDOUIsdURBQXFDO0FBQ3JDLHdEQUFzQztBQUN0QyxxREFBbUM7QUFDbkMscURBQW1DO0FBQ25DLGtEQUFnQztBQUNoQyxvREFBa0M7QUFDbEMsd0RBQXNDO0FBQ3RDLDJEQUF5QztBQUN6Qyx1REFBcUM7QUFDckMsMERBQXdDO0FBQ3hDLG1EQUFpQztBQUNqQyxzREFBb0M7QUFDcEMsc0RBQW9DO0FBQ3BDLHdEQUFzQztBQUN0QyxxREFBbUM7QUFDbkMsMkRBQXlDO0FBQ3pDLGlEQUErQjtBQUMvQixzREFBb0M7QUFlcEMsNkRBQTBEO0FBQzFELHVEQUFvRDtBQUNwRCxpREFBOEM7QUFDOUMscURBQWtEO0FBQ2xELCtDQUE0QztBQUM1Qyw2REFBMEQ7QUFDMUQsK0RBQTREO0FBQzVELHlEQUFzRDtBQUN0RCx5REFBc0Q7QUFDdEQsbURBQWdEO0FBQ2hELHVEQUFvRDtBQUNwRCwrREFBNEQ7QUFDNUQscUVBQWtFO0FBQ2xFLDZEQUEwRDtBQUMxRCxtRUFBZ0U7QUFDaEUscURBQWtEO0FBQ2xELDJEQUF3RDtBQUN4RCwyREFBd0Q7QUFDeEQsK0RBQTREO0FBQzVELHlEQUFzRDtBQUN0RCxxRUFBa0U7QUFDbEUsaURBQThDO0FBQzlDLDJEQUF3RDtBQUV4RCx1Q0FBdUM7QUFDdkMsSUFBSSxVQUFVLEdBQUc7SUFDRyxRQUFRO0lBQ1IsU0FBUztJQUNULFFBQVE7SUFDUixTQUFTO0lBQ1QsTUFBTTtJQUNOLE9BQU87SUFDUCxRQUFRO0lBQ1IsS0FBSztDQUNQLENBQUM7QUFFbkIsSUFBSSxRQUFRLEdBQTJCO0lBQy9CLDJCQUEyQixF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