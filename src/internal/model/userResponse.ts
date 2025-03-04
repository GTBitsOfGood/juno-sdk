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

export class UserResponse {
    /**
    * User id
    */
    'id': number;
    /**
    * User email
    */
    'email': string;
    /**
    * User name
    */
    'name': string;
    /**
    * User type
    */
    'type': UserResponse.TypeEnum;
    /**
    * Project IDs associated with user
    */
    'projectIds': Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number"
        },
        {
            "name": "email",
            "baseName": "email",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "UserResponse.TypeEnum"
        },
        {
            "name": "projectIds",
            "baseName": "projectIds",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return UserResponse.attributeTypeMap;
    }
}

export namespace UserResponse {
    export enum TypeEnum {
        NUMBER_0 = <any> 0,
        NUMBER_1 = <any> 1,
        NUMBER_2 = <any> 2,
        NUMBER_MINUS_1 = <any> -1
    }
}
