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

export class EmailSender {
  'username': string;
  'description'?: string;
  'domain': string;
  'projects': Array<object>;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: 'username',
      baseName: 'username',
      type: 'string',
    },
    {
      name: 'description',
      baseName: 'description',
      type: 'string',
    },
    {
      name: 'domain',
      baseName: 'domain',
      type: 'string',
    },
    {
      name: 'projects',
      baseName: 'projects',
      type: 'Array<object>',
    },
  ];

  static getAttributeTypeMap() {
    return EmailSender.attributeTypeMap;
  }
}
