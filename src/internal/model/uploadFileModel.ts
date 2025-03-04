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

export class UploadFileModel {
    /**
    * Name of file
    */
    'fileName': string;
    /**
    * Name of bucket.
    */
    'bucketName': string;
    /**
    * Name of file provider
    */
    'providerName': string;
    /**
    * File\'s configId
    */
    'configId': number;
    /**
    * File provider\'s region
    */
    'region'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "fileName",
            "baseName": "fileName",
            "type": "string"
        },
        {
            "name": "bucketName",
            "baseName": "bucketName",
            "type": "string"
        },
        {
            "name": "providerName",
            "baseName": "providerName",
            "type": "string"
        },
        {
            "name": "configId",
            "baseName": "configId",
            "type": "number"
        },
        {
            "name": "region",
            "baseName": "region",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return UploadFileModel.attributeTypeMap;
    }
}

