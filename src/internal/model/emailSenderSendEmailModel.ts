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

export class EmailSenderSendEmailModel {
  /**
   * Sender email address
   */
  'email': string;
  /**
   * Sender name
   */
  'name'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: 'email',
      baseName: 'email',
      type: 'string',
    },
    {
      name: 'name',
      baseName: 'name',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return EmailSenderSendEmailModel.attributeTypeMap;
  }
}
