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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { GroupingTaskRequest } from '../model/groupingTaskRequest';
import { MemoryGameTaskRequest } from '../model/memoryGameTaskRequest';
import { PairingTaskRequest } from '../model/pairingTaskRequest';
import { SentenceCompletionTaskRequest } from '../model/sentenceCompletionTaskRequest';
import { SentenceCreationTaskRequest } from '../model/sentenceCreationTaskRequest';
import { SortingTaskRequest } from '../model/sortingTaskRequest';
import { StartedExercise } from '../model/startedExercise';
import { TrueFalseTaskRequest } from '../model/trueFalseTaskRequest';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class EvaluateService {

  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  protected basePath = 'https://meixner.herokuapp.com';

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

        if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;

        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Evaluate grouping request by taskId to a student by user id
     *
     * @param startedExerciseId startedExerciseId
     * @param taskId taskId
     * @param groupingTaskRequest taskRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaluateGroupingUsingPOST(startedExerciseId: number, taskId: number, groupingTaskRequest: GroupingTaskRequest, observe?: 'body', reportProgress?: boolean): Observable<StartedExercise>;
    public evaluateGroupingUsingPOST(startedExerciseId: number, taskId: number, groupingTaskRequest: GroupingTaskRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StartedExercise>>;
    public evaluateGroupingUsingPOST(startedExerciseId: number, taskId: number, groupingTaskRequest: GroupingTaskRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StartedExercise>>;
    public evaluateGroupingUsingPOST(startedExerciseId: number, taskId: number, groupingTaskRequest: GroupingTaskRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (startedExerciseId === null || startedExerciseId === undefined) {
            throw new Error('Required parameter startedExerciseId was null or undefined when calling evaluateGroupingUsingPOST.');
        }
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling evaluateGroupingUsingPOST.');
        }
        if (groupingTaskRequest === null || groupingTaskRequest === undefined) {
            throw new Error('Required parameter groupingTaskRequest was null or undefined when calling evaluateGroupingUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<StartedExercise>(`${this.configuration.basePath}/evaluate/grouping/${encodeURIComponent(String(startedExerciseId))}/${encodeURIComponent(String(taskId))}`,
            groupingTaskRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Evaluate memory game request by taskId to a student by user id
     *
     * @param startedExerciseId startedExerciseId
     * @param taskId taskId
     * @param memoryGameTaskRequest taskRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaluateMemoryGameUsingPOST(startedExerciseId: number, taskId: number, memoryGameTaskRequest: MemoryGameTaskRequest, observe?: 'body', reportProgress?: boolean): Observable<StartedExercise>;
    public evaluateMemoryGameUsingPOST(startedExerciseId: number, taskId: number, memoryGameTaskRequest: MemoryGameTaskRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StartedExercise>>;
    public evaluateMemoryGameUsingPOST(startedExerciseId: number, taskId: number, memoryGameTaskRequest: MemoryGameTaskRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StartedExercise>>;
    public evaluateMemoryGameUsingPOST(startedExerciseId: number, taskId: number, memoryGameTaskRequest: MemoryGameTaskRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (startedExerciseId === null || startedExerciseId === undefined) {
            throw new Error('Required parameter startedExerciseId was null or undefined when calling evaluateMemoryGameUsingPOST.');
        }
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling evaluateMemoryGameUsingPOST.');
        }
        if (memoryGameTaskRequest === null || memoryGameTaskRequest === undefined) {
            throw new Error('Required parameter memoryGameTaskRequest was null or undefined when calling evaluateMemoryGameUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<StartedExercise>(`${this.configuration.basePath}/evaluate/memory/${encodeURIComponent(String(startedExerciseId))}/${encodeURIComponent(String(taskId))}`,
            memoryGameTaskRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Evaluate pairing request by taskId to a student by user id
     *
     * @param startedExerciseId startedExerciseId
     * @param taskId taskId
     * @param pairingTaskRequest taskRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaluatePairingUsingPOST(startedExerciseId: number, taskId: number, pairingTaskRequest: PairingTaskRequest, observe?: 'body', reportProgress?: boolean): Observable<StartedExercise>;
    public evaluatePairingUsingPOST(startedExerciseId: number, taskId: number, pairingTaskRequest: PairingTaskRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StartedExercise>>;
    public evaluatePairingUsingPOST(startedExerciseId: number, taskId: number, pairingTaskRequest: PairingTaskRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StartedExercise>>;
    public evaluatePairingUsingPOST(startedExerciseId: number, taskId: number, pairingTaskRequest: PairingTaskRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (startedExerciseId === null || startedExerciseId === undefined) {
            throw new Error('Required parameter startedExerciseId was null or undefined when calling evaluatePairingUsingPOST.');
        }
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling evaluatePairingUsingPOST.');
        }
        if (pairingTaskRequest === null || pairingTaskRequest === undefined) {
            throw new Error('Required parameter pairingTaskRequest was null or undefined when calling evaluatePairingUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<StartedExercise>(`${this.configuration.basePath}/evaluate/pairing/${encodeURIComponent(String(startedExerciseId))}/${encodeURIComponent(String(taskId))}`,
            pairingTaskRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Evaluate sentence completion request by taskId to a student by user id
     *
     * @param startedExerciseId startedExerciseId
     * @param taskId taskId
     * @param sentenceCompletionTaskRequest taskRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaluateSentenceCompletionUsingPOST(startedExerciseId: number, taskId: number, sentenceCompletionTaskRequest: SentenceCompletionTaskRequest, observe?: 'body', reportProgress?: boolean): Observable<StartedExercise>;
    public evaluateSentenceCompletionUsingPOST(startedExerciseId: number, taskId: number, sentenceCompletionTaskRequest: SentenceCompletionTaskRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StartedExercise>>;
    public evaluateSentenceCompletionUsingPOST(startedExerciseId: number, taskId: number, sentenceCompletionTaskRequest: SentenceCompletionTaskRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StartedExercise>>;
    public evaluateSentenceCompletionUsingPOST(startedExerciseId: number, taskId: number, sentenceCompletionTaskRequest: SentenceCompletionTaskRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (startedExerciseId === null || startedExerciseId === undefined) {
            throw new Error('Required parameter startedExerciseId was null or undefined when calling evaluateSentenceCompletionUsingPOST.');
        }
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling evaluateSentenceCompletionUsingPOST.');
        }
        if (sentenceCompletionTaskRequest === null || sentenceCompletionTaskRequest === undefined) {
            throw new Error('Required parameter sentenceCompletionTaskRequest was null or undefined when calling evaluateSentenceCompletionUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<StartedExercise>(`${this.configuration.basePath}/evaluate/sentenceCompletion/${encodeURIComponent(String(startedExerciseId))}/${encodeURIComponent(String(taskId))}`,
            sentenceCompletionTaskRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Evaluate sentence creation request by taskId to a student by user id
     *
     * @param startedExerciseId startedExerciseId
     * @param taskId taskId
     * @param sentenceCreationTaskRequest taskRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaluateSentenceCreationUsingPOST(startedExerciseId: number, taskId: number, sentenceCreationTaskRequest: SentenceCreationTaskRequest, observe?: 'body', reportProgress?: boolean): Observable<StartedExercise>;
    public evaluateSentenceCreationUsingPOST(startedExerciseId: number, taskId: number, sentenceCreationTaskRequest: SentenceCreationTaskRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StartedExercise>>;
    public evaluateSentenceCreationUsingPOST(startedExerciseId: number, taskId: number, sentenceCreationTaskRequest: SentenceCreationTaskRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StartedExercise>>;
    public evaluateSentenceCreationUsingPOST(startedExerciseId: number, taskId: number, sentenceCreationTaskRequest: SentenceCreationTaskRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (startedExerciseId === null || startedExerciseId === undefined) {
            throw new Error('Required parameter startedExerciseId was null or undefined when calling evaluateSentenceCreationUsingPOST.');
        }
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling evaluateSentenceCreationUsingPOST.');
        }
        if (sentenceCreationTaskRequest === null || sentenceCreationTaskRequest === undefined) {
            throw new Error('Required parameter sentenceCreationTaskRequest was null or undefined when calling evaluateSentenceCreationUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<StartedExercise>(`${this.configuration.basePath}/evaluate/sentenceCreation/${encodeURIComponent(String(startedExerciseId))}/${encodeURIComponent(String(taskId))}`,
            sentenceCreationTaskRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Evaluate sorting request by taskId to a student by user id
     *
     * @param startedExerciseId startedExerciseId
     * @param taskId taskId
     * @param sortingTaskRequest taskRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaluateSortingUsingPOST(startedExerciseId: number, taskId: number, sortingTaskRequest: SortingTaskRequest, observe?: 'body', reportProgress?: boolean): Observable<StartedExercise>;
    public evaluateSortingUsingPOST(startedExerciseId: number, taskId: number, sortingTaskRequest: SortingTaskRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StartedExercise>>;
    public evaluateSortingUsingPOST(startedExerciseId: number, taskId: number, sortingTaskRequest: SortingTaskRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StartedExercise>>;
    public evaluateSortingUsingPOST(startedExerciseId: number, taskId: number, sortingTaskRequest: SortingTaskRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (startedExerciseId === null || startedExerciseId === undefined) {
            throw new Error('Required parameter startedExerciseId was null or undefined when calling evaluateSortingUsingPOST.');
        }
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling evaluateSortingUsingPOST.');
        }
        if (sortingTaskRequest === null || sortingTaskRequest === undefined) {
            throw new Error('Required parameter sortingTaskRequest was null or undefined when calling evaluateSortingUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<StartedExercise>(`${this.configuration.basePath}/evaluate/sorting/${encodeURIComponent(String(startedExerciseId))}/${encodeURIComponent(String(taskId))}`,
            sortingTaskRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Evaluate true false request by taskId to a student by user id
     *
     * @param startedExerciseId startedExerciseId
     * @param taskId taskId
     * @param trueFalseTaskRequest taskRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaluateTrueFalseUsingPOST(startedExerciseId: number, taskId: number, trueFalseTaskRequest: TrueFalseTaskRequest, observe?: 'body', reportProgress?: boolean): Observable<StartedExercise>;
    public evaluateTrueFalseUsingPOST(startedExerciseId: number, taskId: number, trueFalseTaskRequest: TrueFalseTaskRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StartedExercise>>;
    public evaluateTrueFalseUsingPOST(startedExerciseId: number, taskId: number, trueFalseTaskRequest: TrueFalseTaskRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StartedExercise>>;
    public evaluateTrueFalseUsingPOST(startedExerciseId: number, taskId: number, trueFalseTaskRequest: TrueFalseTaskRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (startedExerciseId === null || startedExerciseId === undefined) {
            throw new Error('Required parameter startedExerciseId was null or undefined when calling evaluateTrueFalseUsingPOST.');
        }
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling evaluateTrueFalseUsingPOST.');
        }
        if (trueFalseTaskRequest === null || trueFalseTaskRequest === undefined) {
            throw new Error('Required parameter trueFalseTaskRequest was null or undefined when calling evaluateTrueFalseUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<StartedExercise>(`${this.configuration.basePath}/evaluate/truefalse/${encodeURIComponent(String(startedExerciseId))}/${encodeURIComponent(String(taskId))}`,
            trueFalseTaskRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
