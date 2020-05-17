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
import {Sentence} from './sentence';


export interface SentenceCreationAndSortingRequest {
    title: string;
    difficulty?: number;
    subject: SentenceCreationAndSortingRequest.SubjectEnum;
    recommendedMinClass?: number;
    recommendedMaxClass?: number;
    sentences: Array<Sentence>;
}
export namespace SentenceCreationAndSortingRequest {
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
}
