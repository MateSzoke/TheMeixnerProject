/**
 * The Meixner Project
 * The REST API of the Meixner education project
 *
 * OpenAPI spec version: 1.0
 * Contact: mate.szoke2@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface MediaItemResponse { 
    content: string;
    id: number;
    type: MediaItemResponse.TypeEnum;
}
export namespace MediaItemResponse {
    export type TypeEnum = 'TEXT' | 'FILE';
    export const TypeEnum = {
        TEXT: 'TEXT' as TypeEnum,
        FILE: 'FILE' as TypeEnum
    };
}
