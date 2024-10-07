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
export class RegisterDomainResponse {
    'id';
    'valid';
    'records';
    'statusCode';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number"
        },
        {
            "name": "valid",
            "baseName": "valid",
            "type": "string"
        },
        {
            "name": "records",
            "baseName": "records",
            "type": "SendGridDNSResponse"
        },
        {
            "name": "statusCode",
            "baseName": "statusCode",
            "type": "number"
        }
    ];
    static getAttributeTypeMap() {
        return RegisterDomainResponse.attributeTypeMap;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJEb21haW5SZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbnRlcm5hbC9tb2RlbC9yZWdpc3RlckRvbWFpblJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFLSCxNQUFNLE9BQU8sc0JBQXNCO0lBQy9CLElBQUksQ0FBUztJQUNiLE9BQU8sQ0FBUztJQUNoQixTQUFTLENBQXNCO0lBQy9CLFlBQVksQ0FBUztJQUVyQixNQUFNLENBQUMsYUFBYSxHQUF1QixTQUFTLENBQUM7SUFFckQsTUFBTSxDQUFDLGdCQUFnQixHQUEwRDtRQUM3RTtZQUNJLE1BQU0sRUFBRSxJQUFJO1lBQ1osVUFBVSxFQUFFLElBQUk7WUFDaEIsTUFBTSxFQUFFLFFBQVE7U0FDbkI7UUFDRDtZQUNJLE1BQU0sRUFBRSxPQUFPO1lBQ2YsVUFBVSxFQUFFLE9BQU87WUFDbkIsTUFBTSxFQUFFLFFBQVE7U0FDbkI7UUFDRDtZQUNJLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLE1BQU0sRUFBRSxxQkFBcUI7U0FDaEM7UUFDRDtZQUNJLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLE1BQU0sRUFBRSxRQUFRO1NBQ25CO0tBQUssQ0FBQztJQUVYLE1BQU0sQ0FBQyxtQkFBbUI7UUFDdEIsT0FBTyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNuRCxDQUFDIn0=