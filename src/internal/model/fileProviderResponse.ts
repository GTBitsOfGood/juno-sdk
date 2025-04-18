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

export class FileProviderResponse {
  /**
   * The unique provider name of the file provider
   */
  'providerName': string;
  /**
   * The metadata of the file provider
   */
  'metadata': string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: 'providerName',
      baseName: 'providerName',
      type: 'string',
    },
    {
      name: 'metadata',
      baseName: 'metadata',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return FileProviderResponse.attributeTypeMap;
  }
}
