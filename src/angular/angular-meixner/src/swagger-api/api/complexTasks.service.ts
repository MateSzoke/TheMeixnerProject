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

import { GroupingAndSortingRequest } from '../model/groupingAndSortingRequest';
import { GroupingAndSortingResponse } from '../model/groupingAndSortingResponse';
import { SentenceCompletionAndGroupingRequest } from '../model/sentenceCompletionAndGroupingRequest';
import { SentenceCompletionAndGroupingResponse } from '../model/sentenceCompletionAndGroupingResponse';
import { SentenceCompletionAndSortingRequest } from '../model/sentenceCompletionAndSortingRequest';
import { SentenceCompletionAndSortingResponse } from '../model/sentenceCompletionAndSortingResponse';
import { SentenceCreationAndGroupingRequest } from '../model/sentenceCreationAndGroupingRequest';
import { SentenceCreationAndGroupingResponse } from '../model/sentenceCreationAndGroupingResponse';
import { SentenceCreationAndSortingRequest } from '../model/sentenceCreationAndSortingRequest';
import { SentenceCreationAndSortingResponse } from '../model/sentenceCreationAndSortingResponse';
import { SortingAndGroupingRequest } from '../model/sortingAndGroupingRequest';
import { SortingAndGroupingResponse } from '../model/sortingAndGroupingResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class ComplexTasksService {

    protected basePath = 'http://meixner.herokuapp.com';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

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
     * Creates a new Grouping and sorting task.
     *
     * @param groupingAndSortingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createGroupingAndSortingUsingPOST(groupingAndSortingRequest: GroupingAndSortingRequest, observe?: 'body', reportProgress?: boolean): Observable<GroupingAndSortingResponse>;
    public createGroupingAndSortingUsingPOST(groupingAndSortingRequest: GroupingAndSortingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GroupingAndSortingResponse>>;
    public createGroupingAndSortingUsingPOST(groupingAndSortingRequest: GroupingAndSortingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GroupingAndSortingResponse>>;
    public createGroupingAndSortingUsingPOST(groupingAndSortingRequest: GroupingAndSortingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (groupingAndSortingRequest === null || groupingAndSortingRequest === undefined) {
            throw new Error('Required parameter groupingAndSortingRequest was null or undefined when calling createGroupingAndSortingUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.post<GroupingAndSortingResponse>(`${this.configuration.basePath}/tasks/groupingAndSorting`,
            groupingAndSortingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Creates a new Sentence completion and grouping task.
     *
     * @param sentenceCompletionAndGroupingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSentenceCompletionAndGroupingUsingPOST(sentenceCompletionAndGroupingRequest: SentenceCompletionAndGroupingRequest, observe?: 'body', reportProgress?: boolean): Observable<SentenceCompletionAndGroupingResponse>;
    public createSentenceCompletionAndGroupingUsingPOST(sentenceCompletionAndGroupingRequest: SentenceCompletionAndGroupingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SentenceCompletionAndGroupingResponse>>;
    public createSentenceCompletionAndGroupingUsingPOST(sentenceCompletionAndGroupingRequest: SentenceCompletionAndGroupingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SentenceCompletionAndGroupingResponse>>;
    public createSentenceCompletionAndGroupingUsingPOST(sentenceCompletionAndGroupingRequest: SentenceCompletionAndGroupingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (sentenceCompletionAndGroupingRequest === null || sentenceCompletionAndGroupingRequest === undefined) {
            throw new Error('Required parameter sentenceCompletionAndGroupingRequest was null or undefined when calling createSentenceCompletionAndGroupingUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.post<SentenceCompletionAndGroupingResponse>(`${this.configuration.basePath}/tasks/sentenceCompletionAndGrouping`,
            sentenceCompletionAndGroupingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Creates a new Sentence completion and sorting task.
     *
     * @param sentenceCompletionAndSortingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSentenceCompletionAndSortingUsingPOST(sentenceCompletionAndSortingRequest: SentenceCompletionAndSortingRequest, observe?: 'body', reportProgress?: boolean): Observable<SentenceCompletionAndSortingResponse>;
    public createSentenceCompletionAndSortingUsingPOST(sentenceCompletionAndSortingRequest: SentenceCompletionAndSortingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SentenceCompletionAndSortingResponse>>;
    public createSentenceCompletionAndSortingUsingPOST(sentenceCompletionAndSortingRequest: SentenceCompletionAndSortingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SentenceCompletionAndSortingResponse>>;
    public createSentenceCompletionAndSortingUsingPOST(sentenceCompletionAndSortingRequest: SentenceCompletionAndSortingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (sentenceCompletionAndSortingRequest === null || sentenceCompletionAndSortingRequest === undefined) {
            throw new Error('Required parameter sentenceCompletionAndSortingRequest was null or undefined when calling createSentenceCompletionAndSortingUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.post<SentenceCompletionAndSortingResponse>(`${this.configuration.basePath}/tasks/sentenceCompletionAndSorting`,
            sentenceCompletionAndSortingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Creates a new Sentence creation and grouping task.
     *
     * @param sentenceCreationAndGroupingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSentenceCreationAndGroupingUsingPOST(sentenceCreationAndGroupingRequest: SentenceCreationAndGroupingRequest, observe?: 'body', reportProgress?: boolean): Observable<SentenceCreationAndGroupingResponse>;
    public createSentenceCreationAndGroupingUsingPOST(sentenceCreationAndGroupingRequest: SentenceCreationAndGroupingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SentenceCreationAndGroupingResponse>>;
    public createSentenceCreationAndGroupingUsingPOST(sentenceCreationAndGroupingRequest: SentenceCreationAndGroupingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SentenceCreationAndGroupingResponse>>;
    public createSentenceCreationAndGroupingUsingPOST(sentenceCreationAndGroupingRequest: SentenceCreationAndGroupingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (sentenceCreationAndGroupingRequest === null || sentenceCreationAndGroupingRequest === undefined) {
            throw new Error('Required parameter sentenceCreationAndGroupingRequest was null or undefined when calling createSentenceCreationAndGroupingUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.post<SentenceCreationAndGroupingResponse>(`${this.configuration.basePath}/tasks/sentenceCreationAndGrouping`,
            sentenceCreationAndGroupingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Creates a new Sentence creation and sorting task.
     *
     * @param sentenceCreationAndSortingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSentenceCreationAndSortingUsingPOST(sentenceCreationAndSortingRequest: SentenceCreationAndSortingRequest, observe?: 'body', reportProgress?: boolean): Observable<SentenceCreationAndSortingResponse>;
    public createSentenceCreationAndSortingUsingPOST(sentenceCreationAndSortingRequest: SentenceCreationAndSortingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SentenceCreationAndSortingResponse>>;
    public createSentenceCreationAndSortingUsingPOST(sentenceCreationAndSortingRequest: SentenceCreationAndSortingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SentenceCreationAndSortingResponse>>;
    public createSentenceCreationAndSortingUsingPOST(sentenceCreationAndSortingRequest: SentenceCreationAndSortingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (sentenceCreationAndSortingRequest === null || sentenceCreationAndSortingRequest === undefined) {
            throw new Error('Required parameter sentenceCreationAndSortingRequest was null or undefined when calling createSentenceCreationAndSortingUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.post<SentenceCreationAndSortingResponse>(`${this.configuration.basePath}/tasks/sentenceCreationAndSorting`,
            sentenceCreationAndSortingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Creates a new Sorting and Grouping task.
     *
     * @param sortingAndGroupingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSortingAndGroupingUsingPOST(sortingAndGroupingRequest: SortingAndGroupingRequest, observe?: 'body', reportProgress?: boolean): Observable<SortingAndGroupingResponse>;
    public createSortingAndGroupingUsingPOST(sortingAndGroupingRequest: SortingAndGroupingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SortingAndGroupingResponse>>;
    public createSortingAndGroupingUsingPOST(sortingAndGroupingRequest: SortingAndGroupingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SortingAndGroupingResponse>>;
    public createSortingAndGroupingUsingPOST(sortingAndGroupingRequest: SortingAndGroupingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (sortingAndGroupingRequest === null || sortingAndGroupingRequest === undefined) {
            throw new Error('Required parameter sortingAndGroupingRequest was null or undefined when calling createSortingAndGroupingUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.post<SortingAndGroupingResponse>(`${this.configuration.basePath}/tasks/sortingAndGrouping`,
            sortingAndGroupingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates existing Grouping and sorting task by taskId.
     *
     * @param taskId taskId
     * @param groupingAndSortingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateGroupingAndSortingByIdUsingPATCH(taskId: number, groupingAndSortingRequest: GroupingAndSortingRequest, observe?: 'body', reportProgress?: boolean): Observable<GroupingAndSortingResponse>;
    public updateGroupingAndSortingByIdUsingPATCH(taskId: number, groupingAndSortingRequest: GroupingAndSortingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GroupingAndSortingResponse>>;
    public updateGroupingAndSortingByIdUsingPATCH(taskId: number, groupingAndSortingRequest: GroupingAndSortingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GroupingAndSortingResponse>>;
    public updateGroupingAndSortingByIdUsingPATCH(taskId: number, groupingAndSortingRequest: GroupingAndSortingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling updateGroupingAndSortingByIdUsingPATCH.');
        }
        if (groupingAndSortingRequest === null || groupingAndSortingRequest === undefined) {
            throw new Error('Required parameter groupingAndSortingRequest was null or undefined when calling updateGroupingAndSortingByIdUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.patch<GroupingAndSortingResponse>(`${this.configuration.basePath}/tasks/groupingAndSorting/${encodeURIComponent(String(taskId))}`,
            groupingAndSortingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates existing Sentence completion and grouping task by taskId.
     *
     * @param taskId taskId
     * @param sentenceCompletionAndGroupingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateSentenceCompletionAndGroupingByIdUsingPATCH(taskId: number, sentenceCompletionAndGroupingRequest: SentenceCompletionAndGroupingRequest, observe?: 'body', reportProgress?: boolean): Observable<SentenceCompletionAndGroupingResponse>;
    public updateSentenceCompletionAndGroupingByIdUsingPATCH(taskId: number, sentenceCompletionAndGroupingRequest: SentenceCompletionAndGroupingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SentenceCompletionAndGroupingResponse>>;
    public updateSentenceCompletionAndGroupingByIdUsingPATCH(taskId: number, sentenceCompletionAndGroupingRequest: SentenceCompletionAndGroupingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SentenceCompletionAndGroupingResponse>>;
    public updateSentenceCompletionAndGroupingByIdUsingPATCH(taskId: number, sentenceCompletionAndGroupingRequest: SentenceCompletionAndGroupingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling updateSentenceCompletionAndGroupingByIdUsingPATCH.');
        }
        if (sentenceCompletionAndGroupingRequest === null || sentenceCompletionAndGroupingRequest === undefined) {
            throw new Error('Required parameter sentenceCompletionAndGroupingRequest was null or undefined when calling updateSentenceCompletionAndGroupingByIdUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.patch<SentenceCompletionAndGroupingResponse>(`${this.configuration.basePath}/tasks/sentenceCompletionAndGrouping/${encodeURIComponent(String(taskId))}`,
            sentenceCompletionAndGroupingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates existing Sentence completion and sorting task by taskId.
     *
     * @param taskId taskId
     * @param sentenceCompletionAndSortingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateSentenceCompletionAndSortingByIdUsingPATCH(taskId: number, sentenceCompletionAndSortingRequest: SentenceCompletionAndSortingRequest, observe?: 'body', reportProgress?: boolean): Observable<SentenceCompletionAndSortingResponse>;
    public updateSentenceCompletionAndSortingByIdUsingPATCH(taskId: number, sentenceCompletionAndSortingRequest: SentenceCompletionAndSortingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SentenceCompletionAndSortingResponse>>;
    public updateSentenceCompletionAndSortingByIdUsingPATCH(taskId: number, sentenceCompletionAndSortingRequest: SentenceCompletionAndSortingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SentenceCompletionAndSortingResponse>>;
    public updateSentenceCompletionAndSortingByIdUsingPATCH(taskId: number, sentenceCompletionAndSortingRequest: SentenceCompletionAndSortingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling updateSentenceCompletionAndSortingByIdUsingPATCH.');
        }
        if (sentenceCompletionAndSortingRequest === null || sentenceCompletionAndSortingRequest === undefined) {
            throw new Error('Required parameter sentenceCompletionAndSortingRequest was null or undefined when calling updateSentenceCompletionAndSortingByIdUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.patch<SentenceCompletionAndSortingResponse>(`${this.configuration.basePath}/tasks/sentenceCompletionAndSorting/${encodeURIComponent(String(taskId))}`,
            sentenceCompletionAndSortingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates existing Sentence creation and grouping task by taskId.
     *
     * @param taskId taskId
     * @param sentenceCreationAndGroupingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateSentenceCreationAndGroupingByIdUsingPATCH(taskId: number, sentenceCreationAndGroupingRequest: SentenceCreationAndGroupingRequest, observe?: 'body', reportProgress?: boolean): Observable<SentenceCreationAndGroupingResponse>;
    public updateSentenceCreationAndGroupingByIdUsingPATCH(taskId: number, sentenceCreationAndGroupingRequest: SentenceCreationAndGroupingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SentenceCreationAndGroupingResponse>>;
    public updateSentenceCreationAndGroupingByIdUsingPATCH(taskId: number, sentenceCreationAndGroupingRequest: SentenceCreationAndGroupingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SentenceCreationAndGroupingResponse>>;
    public updateSentenceCreationAndGroupingByIdUsingPATCH(taskId: number, sentenceCreationAndGroupingRequest: SentenceCreationAndGroupingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling updateSentenceCreationAndGroupingByIdUsingPATCH.');
        }
        if (sentenceCreationAndGroupingRequest === null || sentenceCreationAndGroupingRequest === undefined) {
            throw new Error('Required parameter sentenceCreationAndGroupingRequest was null or undefined when calling updateSentenceCreationAndGroupingByIdUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.patch<SentenceCreationAndGroupingResponse>(`${this.configuration.basePath}/tasks/sentenceCreationAndGrouping/${encodeURIComponent(String(taskId))}`,
            sentenceCreationAndGroupingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates existing Sentence creation and sorting task by taskId.
     *
     * @param taskId taskId
     * @param sentenceCreationAndSortingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateSentenceCreationAndSortingByIdUsingPATCH(taskId: number, sentenceCreationAndSortingRequest: SentenceCreationAndSortingRequest, observe?: 'body', reportProgress?: boolean): Observable<SentenceCreationAndSortingResponse>;
    public updateSentenceCreationAndSortingByIdUsingPATCH(taskId: number, sentenceCreationAndSortingRequest: SentenceCreationAndSortingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SentenceCreationAndSortingResponse>>;
    public updateSentenceCreationAndSortingByIdUsingPATCH(taskId: number, sentenceCreationAndSortingRequest: SentenceCreationAndSortingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SentenceCreationAndSortingResponse>>;
    public updateSentenceCreationAndSortingByIdUsingPATCH(taskId: number, sentenceCreationAndSortingRequest: SentenceCreationAndSortingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling updateSentenceCreationAndSortingByIdUsingPATCH.');
        }
        if (sentenceCreationAndSortingRequest === null || sentenceCreationAndSortingRequest === undefined) {
            throw new Error('Required parameter sentenceCreationAndSortingRequest was null or undefined when calling updateSentenceCreationAndSortingByIdUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.patch<SentenceCreationAndSortingResponse>(`${this.configuration.basePath}/tasks/sentenceCreationAndSorting/${encodeURIComponent(String(taskId))}`,
            sentenceCreationAndSortingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates existing Sorting and Grouping task by taskId.
     *
     * @param taskId taskId
     * @param sortingAndGroupingRequest request
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateSortingAndGroupingByIdUsingPATCH(taskId: number, sortingAndGroupingRequest: SortingAndGroupingRequest, observe?: 'body', reportProgress?: boolean): Observable<SortingAndGroupingResponse>;
    public updateSortingAndGroupingByIdUsingPATCH(taskId: number, sortingAndGroupingRequest: SortingAndGroupingRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SortingAndGroupingResponse>>;
    public updateSortingAndGroupingByIdUsingPATCH(taskId: number, sortingAndGroupingRequest: SortingAndGroupingRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SortingAndGroupingResponse>>;
    public updateSortingAndGroupingByIdUsingPATCH(taskId: number, sortingAndGroupingRequest: SortingAndGroupingRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling updateSortingAndGroupingByIdUsingPATCH.');
        }
        if (sortingAndGroupingRequest === null || sortingAndGroupingRequest === undefined) {
            throw new Error('Required parameter sortingAndGroupingRequest was null or undefined when calling updateSortingAndGroupingByIdUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required


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

        return this.httpClient.patch<SortingAndGroupingResponse>(`${this.configuration.basePath}/tasks/sortingAndGrouping/${encodeURIComponent(String(taskId))}`,
            sortingAndGroupingRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
