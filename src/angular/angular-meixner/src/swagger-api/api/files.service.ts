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

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {CustomHttpUrlEncodingCodec} from '../encoder';

import {Observable} from 'rxjs';

import {MediaItemResponse} from '../model/mediaItemResponse';

import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

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
     * Download file by fileId
     *
     * @param fileId fileId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public downloadFileUsingGET(fileId: number, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public downloadFileUsingGET(fileId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public downloadFileUsingGET(fileId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public downloadFileUsingGET(fileId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fileId === null || fileId === undefined) {
            throw new Error('Required parameter fileId was null or undefined when calling downloadFileUsingGET.');
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

        return this.httpClient.get<string>(`${this.configuration.basePath}/files/download/${encodeURIComponent(String(fileId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * You can upload file here
     *
     * @param file file
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public uploadUsingPOST(file: Blob, observe?: 'body', reportProgress?: boolean): Observable<MediaItemResponse>;
    public uploadUsingPOST(file: Blob, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MediaItemResponse>>;
    public uploadUsingPOST(file: Blob, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MediaItemResponse>>;
    public uploadUsingPOST(file: Blob, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (file === null || file === undefined) {
            throw new Error('Required parameter file was null or undefined when calling uploadUsingPOST.');
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
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (file !== undefined) {
            formParams = formParams.append('file', <any>file) || formParams;
        }

        return this.httpClient.post<MediaItemResponse>(`${this.configuration.basePath}/files/upload`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
