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
import {TaskResultResponse} from './taskResultResponse';


export interface ExerciseResult {
  averageAttempts: number;
  exerciseName: string;
  lastModified: Date;
  taskResults: Array<TaskResultResponse>;
}
