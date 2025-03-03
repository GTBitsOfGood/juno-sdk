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

export class EmailContent {
  /**
   * MIME type for the content
   */
  'type': string;
  /**
   * Content of the email
   */
  'value': string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: 'type',
      baseName: 'type',
      type: 'string',
    },
    {
      name: 'value',
      baseName: 'value',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return EmailContent.attributeTypeMap;
  }
}
