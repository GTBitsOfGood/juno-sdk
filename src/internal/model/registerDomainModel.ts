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

export class RegisterDomainModel {
  /**
   * Domain to be registered
   */
  'domain': string;
  /**
   * Subdomain to be registered
   */
  'subdomain'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: 'domain',
      baseName: 'domain',
      type: 'string',
    },
    {
      name: 'subdomain',
      baseName: 'subdomain',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return RegisterDomainModel.attributeTypeMap;
  }
}
