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

export class LinkProjectModel {
  /**
   * ID of project to be linked
   */
  'id'?: number;
  /**
   * Name of project to be linked
   */
  'name'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: 'id',
      baseName: 'id',
      type: 'number',
    },
    {
      name: 'name',
      baseName: 'name',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return LinkProjectModel.attributeTypeMap;
  }
}
