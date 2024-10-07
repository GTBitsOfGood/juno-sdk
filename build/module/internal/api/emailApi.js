/**
 * Juno
 * Juno Public API Docs
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import localVarRequest from 'request';
import { ObjectSerializer, VoidAuth } from '../model/models';
import { HttpBearerAuth } from '../model/models';
import { HttpError } from './apis';
let defaultBasePath = 'http://localhost';
// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================
export var EmailApiApiKeys;
(function (EmailApiApiKeys) {
})(EmailApiApiKeys || (EmailApiApiKeys = {}));
export class EmailApi {
    _basePath = defaultBasePath;
    _defaultHeaders = {};
    _useQuerystring = false;
    authentications = {
        'default': new VoidAuth(),
        'API_Key': new HttpBearerAuth(),
    };
    interceptors = [];
    constructor(basePathOrUsername, password, basePath) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        }
        else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername;
            }
        }
    }
    set useQuerystring(value) {
        this._useQuerystring = value;
    }
    set basePath(basePath) {
        this._basePath = basePath;
    }
    set defaultHeaders(defaultHeaders) {
        this._defaultHeaders = defaultHeaders;
    }
    get defaultHeaders() {
        return this._defaultHeaders;
    }
    get basePath() {
        return this._basePath;
    }
    setDefaultAuthentication(auth) {
        this.authentications.default = auth;
    }
    setApiKey(key, value) {
        this.authentications[EmailApiApiKeys[key]].apiKey = value;
    }
    set accessToken(accessToken) {
        this.authentications.API_Key.accessToken = accessToken;
    }
    addInterceptor(interceptor) {
        this.interceptors.push(interceptor);
    }
    /**
     *
     * @summary Registers a sender domain.
     * @param registerDomainModel
     */
    async emailControllerRegisterEmailDomain(registerDomainModel, options = { headers: {} }) {
        const localVarPath = this.basePath + '/email/register-domain';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this._defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        }
        else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams = {};
        // verify required parameter 'registerDomainModel' is not null or undefined
        if (registerDomainModel === null || registerDomainModel === undefined) {
            throw new Error('Required parameter registerDomainModel was null or undefined when calling emailControllerRegisterEmailDomain.');
        }
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(registerDomainModel, "RegisterDomainModel")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }
        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "RegisterDomainResponse");
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     *
     * @summary Registers a sender email address.
     * @param registerEmailModel
     */
    async emailControllerRegisterSenderAddress(registerEmailModel, options = { headers: {} }) {
        const localVarPath = this.basePath + '/email/register-sender';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this._defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        }
        else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams = {};
        // verify required parameter 'registerEmailModel' is not null or undefined
        if (registerEmailModel === null || registerEmailModel === undefined) {
            throw new Error('Required parameter registerEmailModel was null or undefined when calling emailControllerRegisterSenderAddress.');
        }
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(registerEmailModel, "RegisterEmailModel")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }
        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "RegisterEmailResponse");
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     *
     * @summary Sends an email using Juno services.
     * @param sendEmailModel
     */
    async emailControllerSendEmail(sendEmailModel, options = { headers: {} }) {
        const localVarPath = this.basePath + '/email/send';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this._defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        }
        else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams = {};
        // verify required parameter 'sendEmailModel' is not null or undefined
        if (sendEmailModel === null || sendEmailModel === undefined) {
            throw new Error('Required parameter sendEmailModel was null or undefined when calling emailControllerSendEmail.');
        }
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(sendEmailModel, "SendEmailModel")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }
        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "SendEmailResponse");
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     *
     * @summary Sets up an email service with the given Sendgrid API Key
     * @param setupEmailServiceModel
     */
    async emailControllerSetup(setupEmailServiceModel, options = { headers: {} }) {
        const localVarPath = this.basePath + '/email/setup';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this._defaultHeaders);
        let localVarFormParams = {};
        // verify required parameter 'setupEmailServiceModel' is not null or undefined
        if (setupEmailServiceModel === null || setupEmailServiceModel === undefined) {
            throw new Error('Required parameter setupEmailServiceModel was null or undefined when calling emailControllerSetup.');
        }
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(setupEmailServiceModel, "SetupEmailServiceModel")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }
        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     *
     * @summary Verifies a sender domain registration status.
     * @param verifyDomainModel
     */
    async emailControllerVerifySenderDomain(verifyDomainModel, options = { headers: {} }) {
        const localVarPath = this.basePath + '/email/verify-domain';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this._defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        }
        else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams = {};
        // verify required parameter 'verifyDomainModel' is not null or undefined
        if (verifyDomainModel === null || verifyDomainModel === undefined) {
            throw new Error('Required parameter verifyDomainModel was null or undefined when calling emailControllerVerifySenderDomain.');
        }
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(verifyDomainModel, "VerifyDomainModel")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }
        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "RegisterDomainResponse");
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvaW50ZXJuYWwvYXBpL2VtYWlsQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFHSCxPQUFPLGVBQWUsTUFBTSxTQUFTLENBQUM7QUFhdEMsT0FBTyxFQUFFLGdCQUFnQixFQUFrQixRQUFRLEVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRixPQUFPLEVBQWlCLGNBQWMsRUFBcUIsTUFBTSxpQkFBaUIsQ0FBQztBQUVuRixPQUFPLEVBQUUsU0FBUyxFQUFlLE1BQU0sUUFBUSxDQUFDO0FBRWhELElBQUksZUFBZSxHQUFHLGtCQUFrQixDQUFDO0FBRXpDLGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQsa0RBQWtEO0FBRWxELE1BQU0sQ0FBTixJQUFZLGVBQ1g7QUFERCxXQUFZLGVBQWU7QUFDM0IsQ0FBQyxFQURXLGVBQWUsS0FBZixlQUFlLFFBQzFCO0FBRUQsTUFBTSxPQUFPLFFBQVE7SUFDUCxTQUFTLEdBQUcsZUFBZSxDQUFDO0lBQzVCLGVBQWUsR0FBUyxFQUFFLENBQUM7SUFDM0IsZUFBZSxHQUFhLEtBQUssQ0FBQztJQUVsQyxlQUFlLEdBQUc7UUFDeEIsU0FBUyxFQUFrQixJQUFJLFFBQVEsRUFBRTtRQUN6QyxTQUFTLEVBQUUsSUFBSSxjQUFjLEVBQUU7S0FDbEMsQ0FBQTtJQUVTLFlBQVksR0FBa0IsRUFBRSxDQUFDO0lBRzNDLFlBQVksa0JBQTBCLEVBQUUsUUFBaUIsRUFBRSxRQUFpQjtRQUN4RSxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2FBQzVCO1NBQ0o7YUFBTTtZQUNILElBQUksa0JBQWtCLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUE7YUFDckM7U0FDSjtJQUNMLENBQUM7SUFF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