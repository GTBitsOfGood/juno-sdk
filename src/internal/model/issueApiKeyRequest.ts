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

import { RequestFile } from './models';

export class IssueApiKeyRequest {
    /**
    * Issuing user email
    */
    'email': string;
    /**
    * Issuing user password
    */
    'password': string;
    /**
    * Optional description for key
    */
    'description': string;
    /**
    * Environemnt this key should be tied to
    */
    'environment': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "email",
            "baseName": "email",
            "type": "string"
        },
        {
            "name": "password",
            "baseName": "password",
            "type": "string"
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string"
        },
        {
            "name": "environment",
            "baseName": "environment",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return IssueApiKeyRequest.attributeTypeMap;
    }
}

