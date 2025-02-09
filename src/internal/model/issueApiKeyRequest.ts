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
   * Optional description for key
   */
  'description'?: string;
  /**
   * Environment the key will be tied to
   */
  'environment': string;
  /**
   * Project identifier
   */
  'project': object;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: 'description',
      baseName: 'description',
      type: 'string',
    },
    {
      name: 'environment',
      baseName: 'environment',
      type: 'string',
    },
    {
      name: 'project',
      baseName: 'project',
      type: 'object',
    },
  ];

  static getAttributeTypeMap() {
    return IssueApiKeyRequest.attributeTypeMap;
  }
}
