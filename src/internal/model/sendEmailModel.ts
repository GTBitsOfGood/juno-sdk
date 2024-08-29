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
import { EmailContent } from './emailContent';
import { EmailRecipient } from './emailRecipient';
import { EmailSender } from './emailSender';

export class SendEmailModel {
    'recipients': Array<EmailRecipient>;
    'sender': EmailSender;
    'content': Array<EmailContent>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "recipients",
            "baseName": "recipients",
            "type": "Array<EmailRecipient>"
        },
        {
            "name": "sender",
            "baseName": "sender",
            "type": "EmailSender"
        },
        {
            "name": "content",
            "baseName": "content",
            "type": "Array<EmailContent>"
        }    ];

    static getAttributeTypeMap() {
        return SendEmailModel.attributeTypeMap;
    }
}

