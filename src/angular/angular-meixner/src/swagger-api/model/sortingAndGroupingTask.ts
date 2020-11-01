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
import {MediaItemResponse} from './mediaItemResponse';


export interface SortingAndGroupingTask {
  elements: Array<MediaItemResponse>;
  taskId: number;
  title: string;
  type: SortingAndGroupingTask.TypeEnum;
}

export namespace SortingAndGroupingTask {
  export type TypeEnum =
    'Grouping'
    | 'Pairing'
    | 'SentenceCompletion'
    | 'SentenceCreation'
    | 'Sorting'
    | 'TrueFalse'
    | 'MemoryGame'
    | 'GroupingAndSorting'
    | 'SentenceCompletionAndGrouping'
    | 'SentenceCompletionAndSorting'
    | 'SentenceCreationAndGrouping'
    | 'SentenceCreationAndSorting'
    | 'SortingAndGrouping'
    | 'BlindMap'
    | 'FreeText'
    | 'OddOneOut'
    | 'TimeLine'
    | 'Table';
  export const TypeEnum = {
    Grouping: 'Grouping' as TypeEnum,
    Pairing: 'Pairing' as TypeEnum,
    SentenceCompletion: 'SentenceCompletion' as TypeEnum,
    SentenceCreation: 'SentenceCreation' as TypeEnum,
    Sorting: 'Sorting' as TypeEnum,
    TrueFalse: 'TrueFalse' as TypeEnum,
    MemoryGame: 'MemoryGame' as TypeEnum,
    GroupingAndSorting: 'GroupingAndSorting' as TypeEnum,
    SentenceCompletionAndGrouping: 'SentenceCompletionAndGrouping' as TypeEnum,
    SentenceCompletionAndSorting: 'SentenceCompletionAndSorting' as TypeEnum,
    SentenceCreationAndGrouping: 'SentenceCreationAndGrouping' as TypeEnum,
    SentenceCreationAndSorting: 'SentenceCreationAndSorting' as TypeEnum,
    SortingAndGrouping: 'SortingAndGrouping' as TypeEnum,
    BlindMap: 'BlindMap' as TypeEnum,
    FreeText: 'FreeText' as TypeEnum,
    OddOneOut: 'OddOneOut' as TypeEnum,
    TimeLine: 'TimeLine' as TypeEnum,
    Table: 'Table' as TypeEnum
  };
}
