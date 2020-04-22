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

import { TaskResponse } from '../model/taskResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

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
     * Deletes the task by it&#39;s taskId.
     * 
     * @param taskId taskId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteTaskByIdUsingDELETE(taskId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteTaskByIdUsingDELETE(taskId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteTaskByIdUsingDELETE(taskId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteTaskByIdUsingDELETE(taskId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling deleteTaskByIdUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.configuration.basePath}/tasks/${encodeURIComponent(String(taskId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Returns all tasks int the database.
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllTaskUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<TaskResponse>>;
    public getAllTaskUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TaskResponse>>>;
    public getAllTaskUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TaskResponse>>>;
    public getAllTaskUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (apiKey) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

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
        ];

        return this.httpClient.get<Array<TaskResponse>>(`${this.configuration.basePath}/tasks`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Returns all tasks of the current user.
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMyTaskUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<TaskResponse>>;
    public getMyTaskUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TaskResponse>>>;
    public getMyTaskUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TaskResponse>>>;
    public getMyTaskUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (apiKey) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

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
        ];

        return this.httpClient.get<Array<TaskResponse>>(`${this.configuration.basePath}/tasks/myTasks`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Returns the specific task by it&#39;s taskId.
     * 
     * @param taskId taskId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTaskByIdUsingGET(taskId: number, observe?: 'body', reportProgress?: boolean): Observable<TaskResponse>;
    public getTaskByIdUsingGET(taskId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TaskResponse>>;
    public getTaskByIdUsingGET(taskId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TaskResponse>>;
    public getTaskByIdUsingGET(taskId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling getTaskByIdUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (apiKey) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

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
        ];

        return this.httpClient.get<TaskResponse>(`${this.configuration.basePath}/tasks/${encodeURIComponent(String(taskId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
