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
import {GroupListItemResponse} from './groupListItemResponse';


export interface SortingAndGroupingResponse {
    difficulty: number;
    groups: Array<GroupListItemResponse>;
    id: number;
    lastModified: Date;
    owner: string;
    recommendedMaxClass: number;
    recommendedMinClass: number;
    subject: SortingAndGroupingResponse.SubjectEnum;
    title: string;
    type: SortingAndGroupingResponse.TypeEnum;
}
export namespace SortingAndGroupingResponse {
    export type SubjectEnum = 'None' | 'Hungarian_grammar_and_literature' | 'Foreign_language' | 'Mathematics' | 'Ethics_religion' | 'Knowledge_environment' | 'Music' | 'Visual_culture' | 'Technique' | 'Sport' | 'History' | 'Biology' | 'Physics';
    export const SubjectEnum = {
        None: 'None' as SubjectEnum,
        HungarianGrammarAndLiterature: 'Hungarian_grammar_and_literature' as SubjectEnum,
        ForeignLanguage: 'Foreign_language' as SubjectEnum,
        Mathematics: 'Mathematics' as SubjectEnum,
        EthicsReligion: 'Ethics_religion' as SubjectEnum,
        KnowledgeEnvironment: 'Knowledge_environment' as SubjectEnum,
        Music: 'Music' as SubjectEnum,
        VisualCulture: 'Visual_culture' as SubjectEnum,
        Technique: 'Technique' as SubjectEnum,
        Sport: 'Sport' as SubjectEnum,
        History: 'History' as SubjectEnum,
        Biology: 'Biology' as SubjectEnum,
        Physics: 'Physics' as SubjectEnum
    };
    export type TypeEnum = 'Grouping' | 'Pairing' | 'SentenceCompletion' | 'SentenceCreation' | 'Sorting' | 'TrueFalse' | 'MemoryGame' | 'GroupingAndSorting' | 'SentenceCompletionAndGrouping' | 'SentenceCompletionAndSorting' | 'SentenceCreationAndGrouping' | 'SentenceCreationAndSorting' | 'SortingAndGrouping' | 'BlindMap' | 'FreeText' | 'OddOneOut' | 'TimeLine' | 'Table';
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
