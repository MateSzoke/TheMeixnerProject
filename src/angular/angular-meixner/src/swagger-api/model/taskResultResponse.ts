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
import {TaskResponse} from './taskResponse';
import {UserResponse} from './userResponse';


export interface TaskResultResponse {
  attempts: number;
  currentResult: Array<boolean>;
  id: number;
  lastModified: Date;
  taskResult?: TaskResponse;
  user: UserResponse;
}
