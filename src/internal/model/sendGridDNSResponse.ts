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
import { SendGridDNSRecord } from './sendGridDNSRecord';

export class SendGridDNSResponse {
    'mailCname': SendGridDNSRecord;
    'dkim1': SendGridDNSRecord;
    'dkim2': SendGridDNSRecord;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "mailCname",
            "baseName": "mail_cname",
            "type": "SendGridDNSRecord"
        },
        {
            "name": "dkim1",
            "baseName": "dkim1",
            "type": "SendGridDNSRecord"
        },
        {
            "name": "dkim2",
            "baseName": "dkim2",
            "type": "SendGridDNSRecord"
        }    ];

    static getAttributeTypeMap() {
        return SendGridDNSResponse.attributeTypeMap;
    }
}

